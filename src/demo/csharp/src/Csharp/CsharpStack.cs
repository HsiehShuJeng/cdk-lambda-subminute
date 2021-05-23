using Amazon.CDK;
using Amazon.CDK.AWS.Lambda;
using ScottHsieh.Cdk;

namespace Csharp
{
    public class CsharpStack : Stack
    {
        internal CsharpStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            var targetLambda = new Function(this, "targetFunction", new FunctionProps
            {
                Code = Code.FromInline("exports.handler = function(event, ctx, cb) { return cb(null, \"hi\"); })"),
                FunctionName = "testTargetFunction",
                Runtime = Runtime.NODEJS_12_X,
                Handler = "index.handler"
            });
            string cronJobExample = "cron(50/1 6-7 ? * SUN-SAT *)";
            var subminuteMaster = new LambdaSubminute(this, "LambdaSubminute", new LambdaSubminuteProps
            {
                TargetFunction = targetLambda,
                CronjobExpression = cronJobExample,
                Frequency = 10,
                IntervalTime = 6,
            });
        
            new CfnOutput(this, "OStateMachineArn", new CfnOutputProps
            {
                Value = subminuteMaster.StateMachineArn
            });
            new CfnOutput(this, "OIteratorFunctionArn", new CfnOutputProps
            {
                Value = subminuteMaster.IteratorFunction.FunctionArn
            });
        }
    }
}
