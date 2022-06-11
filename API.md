# API Reference

**Classes**

Name|Description
----|-----------
[IteratorLambda](#cdk-lambda-subminute-iteratorlambda)|*No description*
[LambdaSubminute](#cdk-lambda-subminute-lambdasubminute)|*No description*
[SubminuteStateMachine](#cdk-lambda-subminute-subminutestatemachine)|*No description*


**Structs**

Name|Description
----|-----------
[IteratorLambdaProps](#cdk-lambda-subminute-iteratorlambdaprops)|*No description*
[LambdaSubminuteProps](#cdk-lambda-subminute-lambdasubminuteprops)|*No description*
[SubminuteStateMachineProps](#cdk-lambda-subminute-subminutestatemachineprops)|*No description*



## class IteratorLambda  <a id="cdk-lambda-subminute-iteratorlambda"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new IteratorLambda(scope: Construct, name: string, props: IteratorLambdaProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[IteratorLambdaProps](#cdk-lambda-subminute-iteratorlambdaprops)</code>)  *No description*
  * **targetFunction** (<code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code>)  The Lambda function that is going to be executed per time unit less than one minute. 



### Properties


Name | Type | Description 
-----|------|-------------
**function** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | A Lambda function that plays the role of the iterator.



## class LambdaSubminute  <a id="cdk-lambda-subminute-lambdasubminute"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new LambdaSubminute(parent: Construct, name: string, props: LambdaSubminuteProps)
```

* **parent** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[LambdaSubminuteProps](#cdk-lambda-subminute-lambdasubminuteprops)</code>)  *No description*
  * **targetFunction** (<code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code>)  The Lambda function that is going to be executed per time unit less than one minute. 
  * **cronjobExpression** (<code>string</code>)  A pattern you want this statemachine to be executed. __*Default*__: cron(50/1 15-17 ? * * *) UTC+0 being run every minute starting from 15:00 PM to 17:00 PM.
  * **frequency** (<code>number</code>)  How many times you intent to execute in a minute. __*Default*__: 6
  * **intervalTime** (<code>number</code>)  Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute. __*Default*__: 10



### Properties


Name | Type | Description 
-----|------|-------------
**iteratorFunction** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | The Lambda function that plays the role of the iterator.
**stateMachineArn** | <code>string</code> | The ARN of the state machine that executes the target Lambda function per time unit less than one minute.



## class SubminuteStateMachine  <a id="cdk-lambda-subminute-subminutestatemachine"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new SubminuteStateMachine(scope: Construct, id: string, props: SubminuteStateMachineProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SubminuteStateMachineProps](#cdk-lambda-subminute-subminutestatemachineprops)</code>)  *No description*
  * **frequency** (<code>number</code>)  How many times you intent to execute in a minute. 
  * **intervalTime** (<code>number</code>)  Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute. 
  * **iteratorFunction** (<code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code>)  the iterator Lambda function for the target Lambda function. 
  * **stateMachineName** (<code>string</code>)  the name of the state machine. 
  * **targetFunction** (<code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code>)  the Lambda function that executes your intention. 



### Properties


Name | Type | Description 
-----|------|-------------
**stateMachine** | <code>[aws_stepfunctions.StateMachine](#aws-cdk-lib-aws-stepfunctions-statemachine)</code> | <span></span>



## struct IteratorLambdaProps  <a id="cdk-lambda-subminute-iteratorlambdaprops"></a>






Name | Type | Description 
-----|------|-------------
**targetFunction** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | The Lambda function that is going to be executed per time unit less than one minute.



## struct LambdaSubminuteProps  <a id="cdk-lambda-subminute-lambdasubminuteprops"></a>






Name | Type | Description 
-----|------|-------------
**targetFunction** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | The Lambda function that is going to be executed per time unit less than one minute.
**cronjobExpression**? | <code>string</code> | A pattern you want this statemachine to be executed.<br/>__*Default*__: cron(50/1 15-17 ? * * *) UTC+0 being run every minute starting from 15:00 PM to 17:00 PM.
**frequency**? | <code>number</code> | How many times you intent to execute in a minute.<br/>__*Default*__: 6
**intervalTime**? | <code>number</code> | Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute.<br/>__*Default*__: 10



## struct SubminuteStateMachineProps  <a id="cdk-lambda-subminute-subminutestatemachineprops"></a>






Name | Type | Description 
-----|------|-------------
**frequency** | <code>number</code> | How many times you intent to execute in a minute.
**intervalTime** | <code>number</code> | Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute.
**iteratorFunction** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | the iterator Lambda function for the target Lambda function.
**stateMachineName** | <code>string</code> | the name of the state machine.
**targetFunction** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | the Lambda function that executes your intention.



