#!/usr/bin/env node
// import 'source-map-support/register';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { LambdaSubminute } from '../../cdk-lambda-subminute';

class TypescriptStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const targetLabmda = new Function(this, 'targetFunction', {
      code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); })'),
      functionName: 'testTargetFunction',
      runtime: Runtime.NODEJS_LATEST,
      handler: 'index.handler',
    });
    const cronJobExample = 'cron(50/1 3-4 ? * SUN-SAT *)';
    const subminuteMaster = new LambdaSubminute(this, 'LambdaSubminute', {
      targetFunction: targetLabmda,
      cronjobExpression: cronJobExample,
      frequency: 10,
      intervalTime: 6,
    });

    new cdk.CfnOutput(this, 'OStateMachineArn', { value: subminuteMaster.stateMachineArn });
    new cdk.CfnOutput(this, 'OIteratorFunctionArn', { value: subminuteMaster.iteratorFunction.functionArn });
  }
}

const app = new cdk.App();
new TypescriptStack(app, 'TypescriptStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
         * Account/Region-dependent features and context lookups will not work,
         * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
         * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
         * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});