# cdk-lambda-subminute
This construct creates a state machine that can invoke a Lambda function per time unit which can be less than one minute. You only need to craft a Lambda function and then assign it as an argument into the construct. An example is included.



https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html#asset-bundling
https://github.com/aws/aws-cdk/issues/8589
https://github.com/aws/aws-cdk/issues/14516
https://github.com/aws/aws-cdk/issues/11914