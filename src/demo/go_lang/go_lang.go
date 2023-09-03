package main

import (
	"github.com/HsiehShuJeng/cdk-lambda-subminute-go/cdklambdasubminute/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type LambdaSubminuteStackProps struct {
	awscdk.StackProps
}

func NewLambdaSubminuteStack(scope constructs.Construct, id string, props *LambdaSubminuteStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// Create Lambda function
	targetLambda := awslambda.NewFunction(stack, jsii.String("targetFunction"), &awslambda.FunctionProps{
		Code:         awslambda.Code_FromInline(jsii.String("exports.handler = function(event, ctx, cb) { return cb(null, \"hi\"); }")),
		FunctionName: jsii.String("estTargetFunction"),
		Runtime:      awslambda.Runtime_NODEJS_18_X(),
		Handler:      jsii.String("index.handler"),
	})

	cronJobExample := "cron(50/1 4-5 ? * SUN-SAT *)"
	lambdaSubminute := cdklambdasubminute.NewLambdaSubminute(stack, jsii.String("LambdaSubminute"), &cdklambdasubminute.LambdaSubminuteProps{
		TargetFunction:    targetLambda,
		CronjobExpression: jsii.String(cronJobExample),
		Frequency:         jsii.Number(6),
		IntervalTime:      jsii.Number(9),
	})

	// Outputs
	awscdk.NewCfnOutput(stack, jsii.String("OStateMachineArn"), &awscdk.CfnOutputProps{Value: lambdaSubminute.StateMachineArn()})
	awscdk.NewCfnOutput(stack, jsii.String("OIteratorFunctionArn"), &awscdk.CfnOutputProps{Value: lambdaSubminute.IteratorFunction().FunctionArn()})

	return stack
}

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	NewLambdaSubminuteStack(app, "LambdaSubminuteStack", &LambdaSubminuteStackProps{
		awscdk.StackProps{
			Env: env(),
		},
	})

	app.Synth(nil)
}

func env() *awscdk.Environment {
	return nil
}
