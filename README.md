[![License](https://img.shields.io/badge/License-Apache%202.0-green)](https://opensource.org/licenses/Apache-2.0)  
[![Build](https://github.com/HsiehShuJeng/cdk-lambda-subminute/actions/workflows/build.yml/badge.svg)](https://github.com/HsiehShuJeng/cdk-lambda-subminute/actions/workflows/build.yml) [![Release](https://github.com/HsiehShuJeng/cdk-lambda-subminute/workflows/Release/badge.svg)](https://github.com/HsiehShuJeng/cdk-lambda-subminute/actions/workflows/release.yml)  
[![Python](https://img.shields.io/pypi/pyversions/cdk-lambda-subminute)](https://pypi.org/) [![pip](https://img.shields.io/badge/pip%20install-cdk--lambda--subminute-blue)](https://pypi.org/project/cdk-lambda-subminute/)  
[![pypi evrsion](https://img.shields.io/pypi/v/cdk-lambda-subminute)](https://pypi.org/project/cdk-lambda-subminute/) [![Maven](https://img.shields.io/maven-central/v/io.github.hsiehshujeng/cdk-lambda-subminute)](https://search.maven.org/) [![nuget](https://img.shields.io/nuget/v/Lambda.Subminute)](https://www.nuget.org/packages/Lambda.Subminute/)  
# cdk-lambda-subminute
This construct creates a state machine that can invoke a Lambda function per time unit which can be less than one minute. You only need to craft a Lambda function and then assign it as an argument into the construct. An example is included.

# Example  


# Known issue  
Originally, I utilized `PythonFuncion` in the module of [**@aws-cdk/aws-lambda-python**](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-python-readme.html) to build the iterator Lambda function. Every works fine, including test, on my local machine (MacBook Pro M1), yet when it comes to the CI in Github Actions, it awlays gave me the following message:  
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
I actually have tried many different methods according to the following threads but to no avail.  I'll attempt to test some thoughs or just post the issue onto the CDK Github repo.  
* [Asset Bundling](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html#asset-bundling)  
* [Change the bundler's /asset-output local volume mount location #8589](https://github.com/aws/aws-cdk/issues/8589)  
* [(aws-lambda-python: PythonFunction): unable to use bundling in BitBucket #14156](https://github.com/aws/aws-cdk/issues/14516)  
* [BundlingDockerImage.cp() needs to be explained more in the README #11914](https://github.com/aws/aws-cdk/issues/11914)  