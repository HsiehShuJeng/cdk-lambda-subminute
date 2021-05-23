from aws_cdk import core as cdk

# For consistency with other languages, `cdk` is the preferred import name for
# the CDK"s core module.  The following line also imports it as `core` for use
# with examples from the CDK Developer"s Guide, which are in the process of
# being updated to use `cdk`.  You may delete this import if you don"t need it.
from aws_cdk import core
from aws_cdk.aws_lambda import Code, Function, Runtime
from cdk_lambda_subminute import LambdaSubminute


class PythonStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        target_lambda = Function(
            self, "targetFunction",
            code=Code.from_inline(
                "exports.handler = function(event, ctx, cb) { return cb(null, \"hi\"); })"),
            function_name="testTargetFunction",
            runtime=Runtime.NODEJS_12_X,
            handler="index.handler"
        )
        cron_job_example = "cron(10/1 4-5 ? * SUN-SAT *)"
        subminute_master = LambdaSubminute(
            self, "LambdaSubminute",
            target_function=target_lambda,
            cronjob_expression=cron_job_example,
            frequency=7,
            interval_time=8)

        cdk.CfnOutput(self, "OStateMachineArn",
                      value=subminute_master.state_machine_arn)
        cdk.CfnOutput(self, "OIteratorFunctionArn",
                      value=subminute_master.iterator_function.function_arn)
