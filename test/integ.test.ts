import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaSubminute } from '../src';

test('simple test', () => {
  const outdir = typeof process.env.GITHUB_WORKSPACE === 'undefined' ? cdk.FileSystem.tmpdir : `${process.env.GITHUB_WORKSPACE}/_temp`;
  const app = new cdk.App({ outdir: outdir });
  const stack = new cdk.Stack(app, 'TestStack');
  const targetLabmda = new Function(stack, 'targetFunction', {
    code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); })'),
    functionName: 'testTargetFunction',
    runtime: Runtime.NODEJS_18_X,
    handler: 'index.handler',
  });

  new LambdaSubminute(stack, 'LambdaSubminute', { targetFunction: targetLabmda });
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::IAM::Role', 5);
  template.resourceCountIs('AWS::Lambda::Function', 3);
  template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  template.resourceCountIs('AWS::Events::Rule', 1);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Role: {
      'Fn::GetAtt': [
        'LambdaSubminuteIteratorLambdaIteratorLambdaRole980819E8',
        'Arn',
      ],
    },
    Environment: {
      Variables: {
        TARGET_FN_NAME: {
          Ref: 'targetFunctionFDF105E2',
        },
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    },
    FunctionName: 'lambda-subminute-iterator',
    Handler: 'index.lambdaHandler',
    MemorySize: 128,
    Runtime: 'nodejs18.x',
    Timeout: 58,
    TracingConfig: {
      Mode: 'Active',
    },
  },
  );
  console.log(JSON.stringify(template.findResources('AWS::StepFunctions::StateMachine')), null, 4);
  template.hasResourceProperties('AWS::StepFunctions::StateMachine', Match.objectLike({
    DefinitionString:
    {
      'Fn::Join':
        [
          '',
          [
            '{"StartAt":"ConfigureCount","States":{"ConfigureCount":{"Type":"Pass","Result":{"index":0,"count":6},"ResultPath":"$.iterator","Next":"Iterator"},"Iterator":{"Next":"IsCountReached","Retry":[{"ErrorEquals":["Lambda.ClientExecutionTimeoutException","Lambda.ServiceException","Lambda.AWSLambdaException","Lambda.SdkClientException"],"IntervalSeconds":2,"MaxAttempts":6,"BackoffRate":2}],"Type":"Task","ResultPath":"$.iterator","ResultSelector":{"index.$":"$.Payload.index","count.$":"$.Payload.count","continue.$":"$.Payload.continue"},"Resource":"arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':states:::lambda:invoke","Parameters":{"FunctionName":"',
            {
              'Fn::GetAtt':
                    [
                      'LambdaSubminuteIteratorLambdaIterator43007E8C',
                      'Arn',
                    ],
            },
            '","Payload.$":"$"}},"Wait for the target Lambda function finished":{"Type":"Wait","Seconds":10,"Next":"Iterator"},"IsCountReached":{"Type":"Choice","Choices":[{"Variable":"$.iterator.continue","BooleanEquals":true,"Next":"Wait for the target Lambda function finished"}],"Default":"Done"},"Done":{"Type":"Pass","End":true}}}',
          ],
        ],
    },
    RoleArn:
    {
      'Fn::GetAtt':
        [
          'LambdaSubminuteSubminuteStateMachineStepFunctionExecutionRoleB6DFA802',
          'Arn',
        ],
    },
    StateMachineName: 'lambda-subminute-statemachine',
  }));
  template.hasResourceProperties('AWS::Events::Rule', {
    Name: 'subminute-statemachine-lambda-rule',
    ScheduleExpression: 'cron(50/1 15-17 ? * * *)',
    State: 'ENABLED',
    Targets: [
      {
        Arn: {
          Ref: 'LambdaSubminuteSubminuteStateMachine23D30D9D',
        },
        Id: 'Target0',
        Input: '{"iterator":{"index":0,"count":6}}',
        RoleArn: {
          'Fn::GetAtt': [
            'LambdaSubminuteSubminuteStateMachineEventsRoleE48C5374',
            'Arn',
          ],
        },
      },
    ],
  });
});