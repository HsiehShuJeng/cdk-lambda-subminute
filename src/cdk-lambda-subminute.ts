// import * as sfn from '@aws-cdk/aws-stepfunctions';
// import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';

import { IFunction, Runtime, Tracing } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { RetentionDays } from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface LambdaSubminuteProps {
  /**
    * The Lambda function that is going to be executed per time unit less than one minute.
    */
  readonly targetFunction: IFunction;
}

export class LambdaSubminute extends cdk.Construct {
  /**
     * The Lambda function that plays the role of the iterator.
     */
  readonly iteratorFunction: IFunction;
  constructor(parent: cdk.Construct, name: string, props: LambdaSubminuteProps) {
    super(parent, name);
    const iterator = new IteratorLambda(this, 'IteratorLambda', { targetFunction: props.targetFunction });
    this.iteratorFunction = iterator.function;
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