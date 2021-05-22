# API Reference

**Classes**

Name|Description
----|-----------
[LambdaSubminute](#cdk-lambda-subminute-lambdasubminute)|*No description*


**Structs**

Name|Description
----|-----------
[LambdaSubminuteProps](#cdk-lambda-subminute-lambdasubminuteprops)|*No description*



## class LambdaSubminute  <a id="cdk-lambda-subminute-lambdasubminute"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new LambdaSubminute(parent: Construct, name: string, props: LambdaSubminuteProps)
```

* **parent** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[LambdaSubminuteProps](#cdk-lambda-subminute-lambdasubminuteprops)</code>)  *No description*
  * **targetFunction** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  The Lambda function that is going to be executed per time unit less than one minute. 
  * **conjobExpression** (<code>string</code>)  A pattern you want this statemachine to be executed. __*Default*__: cron(50/1 15-17 ? * * *) UTC+0 being run every minute starting from 15:00 PM to 17:00 PM.



### Properties


Name | Type | Description 
-----|------|-------------
**iteratorFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | The Lambda function that plays the role of the iterator.
**stateMachineArn** | <code>string</code> | The ARN of the state machine that executes the target Lambda function per time unit less than one minute.



## struct LambdaSubminuteProps  <a id="cdk-lambda-subminute-lambdasubminuteprops"></a>






Name | Type | Description 
-----|------|-------------
**targetFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | The Lambda function that is going to be executed per time unit less than one minute.
**conjobExpression**? | <code>string</code> | A pattern you want this statemachine to be executed.<br/>__*Default*__: cron(50/1 15-17 ? * * *) UTC+0 being run every minute starting from 15:00 PM to 17:00 PM.



