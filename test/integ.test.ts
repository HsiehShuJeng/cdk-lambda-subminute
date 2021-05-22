import * as fs from 'fs';
import * as path from 'path';
import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { LambdaSubminute } from '../src';

test('simple test', () => {
  const outdir = typeof process.env.GITHUB_WORKSPACE === 'undefined'? cdk.FileSystem.tmpdir : '/__w/_temp';
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
      },
    },
    FunctionName: 'lambda-subminute-iterator',
    Handler: 'iterator_agent.handler',
    MemorySize: 128,
    Runtime: 'python3.8',
    Timeout: 58,
    TracingConfig: {
      Mode: 'Active',
    },
  });
});