// import * as sfn from '@aws-cdk/aws-stepfunctions';
// import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as path from 'path';
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import * as iam from '@aws-cdk/aws-iam';

import { IFunction, Runtime, Tracing } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { RetentionDays } from '@aws-cdk/aws-logs';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as cdk from '@aws-cdk/core';

export interface LambdaSubminuteProps {
  /**
   * The Lambda function that is going to be executed per time unit less than one minute.
   */
  readonly targetFunction: IFunction;
  /**
   * A pattern you want this statemachine to be executed.
   * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
   *
   * @default cron(50/1 15-17 ? * * *) UTC+0 being run every minute starting from 15:00 PM to 17:00 PM.
   */
  readonly conjobExpression?: string;
}

export class LambdaSubminute extends cdk.Construct {
  /**
   * The Lambda function that plays the role of the iterator.
   */
  readonly iteratorFunction: IFunction;
  /**
   * The ARN of the state machine that executes the target Lambda function per time unit less than one minute.
   */
  readonly stateMachineArn: string;
  constructor(parent: cdk.Construct, name: string, props: LambdaSubminuteProps) {
    super(parent, name);
    const iterator = new IteratorLambda(this, 'IteratorLambda', { targetFunction: props.targetFunction });
    this.iteratorFunction = iterator.function;
    const subminuteStateMachine = new SubminuteStateMachine(this, 'SubminuteStateMachine', {
      stateMachineName: 'lambda-subminute-statemachine',
      targetFunction: props.targetFunction,
      iteratorFunction: this.iteratorFunction,
    });
    this.stateMachineArn = subminuteStateMachine.stateMachine.stateMachineArn;

    const startRule = new events.Rule(this, 'StartSubminuteStateMachine', {
      schedule: events.Schedule.expression(props.conjobExpression ?? 'cron(50/1 15-17 ? * * *)'),
      ruleName: 'subminute-statemachine-lambda-rule',
      description: `A rule to run the subminute state machine, i.e. ${subminuteStateMachine.stateMachine.stateMachineName}`,
    });
    startRule.addTarget(new targets.SfnStateMachine(
      subminuteStateMachine.stateMachine, {
        input: events.RuleTargetInput.fromObject({
          iterator: {
            index: 0,
            count: 6,
          },
        }),
      }));
  }
}

interface IteratorLambdaProps {
  /**
     * The Lambda function that is going to be executed per time unit less than one minute.
     */
  targetFunction: IFunction;
}

class IteratorLambda extends cdk.Construct {
  /**
     * A Lambda function that plays the role of the iterator.
     */
  readonly function: IFunction;
  constructor(scope: cdk.Construct, name: string, props: IteratorLambdaProps) {
    super(scope, name);
    const iteratorLambdaRole = new iam.Role(this, 'IteratorLambdaRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lambda.amazonaws.com'),
      ),
      description: 'An execution role for a Lambda function to invoke a target Lambda Function per time unit less than one minute',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'),
      ],
      roleName: 'Lambda-Iterator-Role',
    });
    cdk.DockerVolumeConsistency.CONSISTENT;


    iteratorLambdaRole.addToPolicy(new iam.PolicyStatement({
      sid: 'TargetLambdaPermission',
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [props.targetFunction.functionArn],
    }));

    this.function = new NodejsFunction(this, 'Iterator', {
      functionName: 'lambda-subminute-iterator',
      description: 'A function for breaking the limit of 1 minute with the CloudWatch Rules.',
      logRetention: RetentionDays.THREE_MONTHS,
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, 'resources/iterator/iterator_agent.ts'),
      handler: 'lambdaHandler',
      environment: {
        TARGET_FN_NAME: props.targetFunction.functionName,
      },
      memorySize: 128,
      role: iteratorLambdaRole,
      timeout: cdk.Duration.seconds(58), // 1 min
      tracing: Tracing.ACTIVE,
    });
  }
}

interface SubminuteStateMachineProps {
  /**
   * the name of the state machine.
   */
  stateMachineName: string;
  /**
   * the Lambda function that executes your intention.
   */
  targetFunction: IFunction;
  /**
   * the iterator Lambda function for the target Lambda function.
   */
  iteratorFunction: IFunction;
}

class SubminuteStateMachine extends cdk.Construct {
  readonly stateMachine: sfn.StateMachine;
  constructor(scope: cdk.Construct, id: string, props: SubminuteStateMachineProps) {
    super(scope, id);
    const stateMachineRole = this._createWorkFlowRole(
      props.targetFunction.functionArn, props.iteratorFunction.functionArn);
    const jobDefinition = this.createJobDefinition(props.iteratorFunction);
    const stateMachine = new sfn.StateMachine(this, 'StateMachine', {
      stateMachineName: props.stateMachineName,
      definition: jobDefinition,
      role: stateMachineRole,
    });
    this.stateMachine = stateMachine;
  }

  /**
   * Creates a state machine for breaking the limit of 1 minute with the CloudWatch Rules.
   *
   * @param iteratorFunction the iterator Lambda function for the target Labmda funciton.
   * @returns THe job definition for the state machine.
   */
  private createJobDefinition = (
    iteratorFunction: IFunction): sfn.Chain => {
    const configureCount = new sfn.Pass(this, 'ConfigureCount', {
      result: sfn.Result.fromObject({
        index: 0,
        count: 6,
      }),
      resultPath: '$.iterator',
    });
    const iterator = new tasks.LambdaInvoke(this, 'Iterator', {
      lambdaFunction: iteratorFunction,
      resultPath: '$.iterator',
      resultSelector: {
        'index.$': '$.Payload.index',
        'count.$': '$.Payload.count',
        'continue.$': '$.Payload.continue',
      },
    });
    const wait = new sfn.Wait(this, 'Wait for the target Lambda function finished', {
      time: sfn.WaitTime.duration(cdk.Duration.seconds(10)),
    });
    wait.next(iterator);
    const done = new sfn.Pass(this, 'Done');

    const isCountReached = new sfn.Choice(this, 'IsCountReached');
    isCountReached.when(sfn.Condition.booleanEquals('$.iterator.continue', true), wait);
    isCountReached.otherwise(done);
    const jobDefinition = configureCount.next(iterator).next(isCountReached);
    return jobDefinition;
  }

  /**
   * Creates a role and corresponding policies for the subminute state machine.
   *
   * @param targetFunctionArn the ARN of the Lambda function that executes your intention.
   * @param iteratorFunctionArn the ARN of the iterator Lambda function for the target Lambda function.
   * @returns the role as the documentation indicates.
   */
  private _createWorkFlowRole = (targetFunctionArn: string, iteratorFunctionArn: string) => {
    const workFlowExecutionRole = new iam.Role(this, 'StepFunctionExecutionRole', {
      assumedBy: new iam.ServicePrincipal('states.amazonaws.com'),
      description: 'Execute a workflow related to executing a Lambda function per time unit less than 1 minute.',
    });
    workFlowExecutionRole.addToPolicy(new iam.PolicyStatement({
      sid: 'LambdaInvokePermissions',
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [
        targetFunctionArn,
        iteratorFunctionArn,
      ],
    }));
    return workFlowExecutionRole;
  }
}