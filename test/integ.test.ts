// import * as fs from 'fs';
// import * as path from 'path';
import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { LambdaSubminute } from '../src';

test('simple test', () => {
  const outdir = typeof process.env.GITHUB_WORKSPACE === 'undefined' ? cdk.FileSystem.tmpdir : '/__w/_temp';
  const app = new cdk.App({ outdir: outdir });
  const stack = new cdk.Stack(app, 'TestStack');
  console.log(cdk.AssetStaging.BUNDLING_OUTPUT_DIR);
  console.log(`outdir:${outdir}`);
  console.log(cdk.FileSystem.tmpdir);
  const targetLabmda = new Function(stack, 'targetFunction', {
    code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); })'),
    functionName: 'testTargetFunction',
    runtime: Runtime.NODEJS_12_X,
    handler: 'index.handler',
  });

  new LambdaSubminute(stack, 'LambdaSubminute', { targetFunction: targetLabmda });

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
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
    Runtime: 'nodejs14.x',
    Timeout: 58,
    TracingConfig: {
      Mode: 'Active',
    },
  },
  );
  expect(stack).toHaveResourceLike('AWS::StepFunctions::StateMachine', {
    RoleArn: {
      'Fn::GetAtt': [
        'LambdaSubminuteSubminuteStateMachineStepFunctionExecutionRoleB6DFA802',
        'Arn',
      ],
    },
    DefinitionString: {
      'Fn::Join': [
        '',
        [
          '{"StartAt":"ConfigureCount","States":{"ConfigureCount":{"Type":"Pass","Result":{"index":0,"count":6},"ResultPath":"$.iterator","Next":"Iterator"},"Iterator":{"Next":"IsCountReached","Retry":[{"ErrorEquals":["Lambda.ServiceException","Lambda.AWSLambdaException","Lambda.SdkClientException"],"IntervalSeconds":2,"MaxAttempts":6,"BackoffRate":2}],"Type":"Task","ResultPath":"$.iterator","ResultSelector":{"index.$":"$.Payload.index","count.$":"$.Payload.count","continue.$":"$.Payload.continue"},"Resource":"arn:',
          {
            Ref: 'AWS::Partition',
          },
          ':states:::lambda:invoke","Parameters":{"FunctionName":"',
          {
            'Fn::GetAtt': [
              'LambdaSubminuteIteratorLambdaIterator43007E8C',
              'Arn',
            ],
          },
          '","Payload.$":"$"}},"Wait for the target Lambda function finished":{"Type":"Wait","Seconds":10,"Next":"Iterator"},"IsCountReached":{"Type":"Choice","Choices":[{"Variable":"$.iterator.continue","BooleanEquals":true,"Next":"Wait for the target Lambda function finished"}],"Default":"Done"},"Done":{"Type":"Pass","End":true}}}',
        ],
      ],
    },
    StateMachineName: 'lambda-subminute-statemachine',
  });
});