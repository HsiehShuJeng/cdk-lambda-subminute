# cdk-lambda-subminute
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](https://opensource.org/licenses/Apache-2.0) [![Release](https://github.com/HsiehShuJeng/cdk-lambda-subminute/workflows/Release/badge.svg)](https://github.com/HsiehShuJeng/cdk-lambda-subminute/actions/workflows/release.yml) [![npm downloads](https://img.shields.io/npm/dt/cdk-lambda-subminute?label=npm%20downloads&style=plastic)](https://img.shields.io/npm/dt/cdk-lambda-subminute?label=npm%20downloads&style=plastic) [![pypi downloads](https://img.shields.io/pypi/dm/cdk-lambda-subminute?label=pypi%20downloads&style=plastic)](https://img.shields.io/pypi/dm/cdk-lambda-subminute?label=pypi%20downloads&style=plastic) [![NuGet downloads](https://img.shields.io/nuget/dt/Lambda.Subminute?label=NuGet%20downloads&style=plastic)](https://img.shields.io/nuget/dt/Lambda.Subminute?label=NuGet%20downloads&style=plastic) [![repo languages](https://img.shields.io/github/languages/count/HsiehShuJeng/cdk-lambda-subminute?style=plastic)](https://img.shields.io/github/languages/count/HsiehShuJeng/cdk-lambda-subminute?style=plastic)  

| npm (JS/TS) | PyPI (Python) | Maven (Java) | Go | NuGet |
| --- | --- | --- | --- | --- |
| [Link](https://www.npmjs.com/package/cdk-lambda-subminute) | [Link](https://pypi.org/project/cdk_lambda_subminute/) | [Link](https://search.maven.org/artifact/io.github.hsiehshujeng/cdk-lambda-subminute) | [Link](https://github.com/HsiehShuJeng/cdk-lambda-subminute-go) | [Link](https://www.nuget.org/packages/Lambda.Subminute/) |   

This construct creates a state machine that can invoke a Lambda function per time unit which can be less than one minute, such as invoking every 10 seconds. You only need to craft a Lambda function and then assign it as an argument into the construct. An example is included.  

# Serverless Architecture  
<p align="center"><img src="https://raw.githubusercontent.com/HsiehShuJeng/cdk-lambda-subminute/main/images/cdk_lambda_subminute.png"/></p>  

# Introduction  
This construct library is reffered to thie AWS Architecture blog post, [*A serverless solution for invoking AWS Lambda at a sub-minute frequency*](https://aws.amazon.com/tw/blogs/architecture/a-serverless-solution-for-invoking-aws-lambda-at-a-sub-minute-frequency/), written by **Emanuele Menga**. I made it as a constrcut library where you only need to care about a target Lambda function, how frequent and how long you want to execute.   

# Example  
## Typescript  
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/typescript).    
```bash
$ cdk --init language typescript
$ yarn add cdk-lambda-subminute
```  
```typescript
class TypescriptStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const targetLabmda = new Function(this, 'targetFunction', {
      code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); })'), // It's just a simple function for demonstration purpose only.
      functionName: 'testTargetFunction',
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
    });
    const cronJobExample = 'cron(50/1 15-17 ? * SUN-SAT *)';
    const subminuteMaster = new LambdaSubminute(this, 'LambdaSubminute', { targetFunction: targetLabmda, cronjobExpression: cronJobExample });

    new cdk.CfnOutput(this, 'OStateMachineArn', { value: subminuteMaster.stateMachineArn });
    new cdk.CfnOutput(this, 'OIteratorFunctionArn', { value: subminuteMaster.iteratorFunction.functionArn });
  }
}

const app = new cdk.App();
new TypescriptStack(app, 'TypescriptStack', {
});
```
## Python
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/python).   
```bash
# upgrading related Python packages
$ python -m ensurepip --upgrade
$ python -m pip install --upgrade pip
$ python -m pip install --upgrade virtualenv
# initialize a CDK Python project
$ cdk init --language python
# make packages installed locally instead of globally
$ source .venv/bin/activate
$ cat <<EOL > requirements.txt
aws-cdk.core
aws-cdk.aws-lambda
cdk-lambda-subminute
EOL
$ python -m pip install -r requirements.txt
```  
```python
from aws_cdk import core as cdk
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
            runtime=Runtime.NODEJS_18_X,
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
```
```bash
$ deactivate
```
## Java  
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/java).  
```bash
$ cdk init --language java
$ mvn package
```
```xml
.
.
<properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <cdk.version>2.87.0</cdk.version>
      <constrcut.verion>2.0.201</constrcut.verion>
      <junit.version>5.7.1</junit.version>
</properties>
 .
 .
 <dependencies>
     <!-- AWS Cloud Development Kit -->
      <dependency>
            <groupId>software.amazon.awscdk</groupId>
            <artifactId>core</artifactId>
            <version>${cdk.version}</version>
      </dependency>
      <dependency>
            <groupId>software.amazon.awscdk</groupId>
            <artifactId>lambda</artifactId>
            <version>${cdk.version}</version>
      </dependency>
      <dependency>
            <groupId>io.github.hsiehshujeng</groupId>
            <artifactId>cdk-lambda-subminute</artifactId>
            <version>${constrcut.verion}</version>
      </dependency>
     .
     .
     .
 </dependencies>
```
```java
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

        Function targetLambda = new Function(this, "targetFunction", 
          FunctionProps.builder()
              .code(Code.fromInline("exports.handler = function(event, ctx, cb) { return cb(null, \"hi\"); })"))
              .functionName("estTargetFunction")
              .runtime(Runtime.NODEJS_18_X)
              .handler("index.handler")
              .build());
        String cronJobExample = "cron(50/1 4-5 ? * SUN-SAT *)";
        LambdaSubminute subminuteMaster = new LambdaSubminute(this, "LambdaSubminute", LambdaSubminuteProps.builder()
              .targetFunction(targetLambda)
              .cronjobExpression(cronJobExample)
              .frequency(6)
              .intervalTime(9)
              .build());

        new CfnOutput(this, "OStateMachineArn",
                CfnOutputProps.builder()
                  .value(subminuteMaster.getStateMachineArn())
                  .build());
        new CfnOutput(this, "OIteratorFunctionArn",
                CfnOutputProps.builder()
                  .value(subminuteMaster.getIteratorFunction().getFunctionName())
                  .build());
    }
}

```
## C#  
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/csharp).  
```bash
$ cdk init --language csharp
$ dotnet add src/Csharp package Amazon.CDK.AWS.Lambda
$ dotnet add src/Csharp package Lambda.Subminute --version 2.0.201
```
```cs
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
                Runtime = Runtime.NODEJS_18_X,
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
```

## GO
```bash
# Initialize a new AWS CDK application in the current directory with the Go programming language
cdk init app -l go
# Add this custom CDK construct to your project
go get github.com/HsiehShuJeng/cdk-lambda-subminute-go/cdklambdasubminute/v2@v2.0.226
# Ensure all dependencies are properly listed in the go.mod file and remove any unused ones
go mod tidy
# Upgrade all Go modules in your project to their latest minor or patch versions
go get -u ./...
```

# Statemachine Diagram  
![image](https://raw.githubusercontent.com/HsiehShuJeng/cdk-lambda-subminute/main/images/statemachine_diagram.png)  


# Known issue  
Originally, I utilized `PythonFuncion` in the module of [**@aws-cdk/aws-lambda-python**](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-python-readme.html) to build the iterator Lambda function. Every thing works fine, including test, on my local machine (MacBook Pro M1), until it comes to the CI in Github Actions, it awlays gave me the following message:  
```bash
## cdk version: 1.105.0 (build 4813992)
Bundling did not produce any output. Check that content is written to /asset-output.

      64 |     }));
      65 |
    > 66 |     this.function = new PythonFunction(this, 'Iterator', {
         |                     ^
      67 |       functionName: 'lambda-subminute-iterator',
      68 |       description: 'A function for breaking the limit of 1 minute with the CloudWatch Rules.',
      69 |       logRetention: RetentionDays.THREE_MONTHS,

      at AssetStaging.bundle (node_modules/@aws-cdk/core/lib/asset-staging.ts:484:13)
      at AssetStaging.stageByBundling (node_modules/@aws-cdk/core/lib/asset-staging.ts:328:10)
      at stageThisAsset (node_modules/@aws-cdk/core/lib/asset-staging.ts:194:35)
      at Cache.obtain (node_modules/@aws-cdk/core/lib/private/cache.ts:24:13)
      at new AssetStaging (node_modules/@aws-cdk/core/lib/asset-staging.ts:219:44)
      at new Asset (node_modules/@aws-cdk/aws-s3-assets/lib/asset.ts:127:21)
      at AssetCode.bind (node_modules/@aws-cdk/aws-lambda/lib/code.ts:277:20)
      at new Function (node_modules/@aws-cdk/aws-lambda/lib/function.ts:583:29)
      at new PythonFunction (node_modules/@aws-cdk/aws-lambda-python/lib/function.ts:106:5)
      at new IteratorLambda (src/cdk-lambda-subminute.ts:66:21)
      at new LambdaSubminute (src/cdk-lambda-subminute.ts:25:22)
      at Object.<anonymous>.test (test/integ.test.ts:23:3)
```
I actually have tried many different methods according to the following threads but to no avail.  I'll attempt to test some thoughts or just post the issue onto the CDK Github repo.  
* [Asset Bundling](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html#asset-bundling)  
* [Change the bundler's /asset-output local volume mount location #8589](https://github.com/aws/aws-cdk/issues/8589)  
* [(aws-lambda-python: PythonFunction): unable to use bundling in BitBucket #14156](https://github.com/aws/aws-cdk/issues/14516)  
* [BundlingDockerImage.cp() needs to be explained more in the README #11914](https://github.com/aws/aws-cdk/issues/11914)  