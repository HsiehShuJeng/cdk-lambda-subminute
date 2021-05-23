package com.myorg;

import software.amazon.awscdk.core.CfnOutput;
import software.amazon.awscdk.core.CfnOutputProps;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.FunctionProps;
import software.amazon.awscdk.services.lambda.Runtime;
import io.github.hsiehshujeng.cdk.lambda.subminute.LambdaSubminute;
import io.github.hsiehshujeng.cdk.lambda.subminute.LambdaSubminuteProps;

public class JavaStack extends Stack {
    public JavaStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public JavaStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        Function targetLambda = new Function(this, "targetFunction", FunctionProps.builder()
                .code(Code.fromInline("exports.handler = function(event, ctx, cb) { return cb(null, \"hi\"); })"))
                .functionName("estTargetFunction").runtime(Runtime.NODEJS_12_X).handler("index.handler").build());
        String cronJobExample = "cron(50/1 4-5 ? * SUN-SAT *)";
        LambdaSubminute subminuteMaster = new LambdaSubminute(this, "LambdaSubminute", LambdaSubminuteProps.builder()
                .targetFunction(targetLambda).cronjobExpression(cronJobExample).frequency(6).intervalTime(9).build());

        new CfnOutput(this, "OStateMachineArn",
                CfnOutputProps.builder().value(subminuteMaster.getStateMachineArn()).build());
        new CfnOutput(this, "OIteratorFunctionArn",
                CfnOutputProps.builder().value(subminuteMaster.getIteratorFunction().getFunctionName()).build());
    }
}
