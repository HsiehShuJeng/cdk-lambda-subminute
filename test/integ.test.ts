import { countResources, expect as expectCDK, SynthUtils } from '@aws-cdk/assert';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { LambdaSubminute } from '../src';

test('simple test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  const targetLabmda = new Function(stack, 'targetFunction', {
    code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); })'),
    functionName: 'testTargetFunction',
    runtime: Runtime.NODEJS_12_X,
    handler: 'index.handler',
  });

  new LambdaSubminute(stack, 'LambdaSubminute', { targetFunction: targetLabmda });

  expectCDK(stack).to(countResources('AWS::Lambda::Function', 3));
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});