# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### IteratorLambda <a name="IteratorLambda" id="cdk-lambda-subminute.IteratorLambda"></a>

#### Initializers <a name="Initializers" id="cdk-lambda-subminute.IteratorLambda.Initializer"></a>

```typescript
import { IteratorLambda } from 'cdk-lambda-subminute'

new IteratorLambda(scope: Construct, name: string, props: IteratorLambdaProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-lambda-subminute.IteratorLambdaProps">IteratorLambdaProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-lambda-subminute.IteratorLambda.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-lambda-subminute.IteratorLambda.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-lambda-subminute.IteratorLambda.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-lambda-subminute.IteratorLambdaProps">IteratorLambdaProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-lambda-subminute.IteratorLambda.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-lambda-subminute.IteratorLambda.isConstruct"></a>

```typescript
import { IteratorLambda } from 'cdk-lambda-subminute'

IteratorLambda.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-lambda-subminute.IteratorLambda.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-lambda-subminute.IteratorLambda.property.function">function</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | A Lambda function that plays the role of the iterator. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-lambda-subminute.IteratorLambda.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `function`<sup>Required</sup> <a name="function" id="cdk-lambda-subminute.IteratorLambda.property.function"></a>

```typescript
public readonly function: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

A Lambda function that plays the role of the iterator.

---


### LambdaSubminute <a name="LambdaSubminute" id="cdk-lambda-subminute.LambdaSubminute"></a>

#### Initializers <a name="Initializers" id="cdk-lambda-subminute.LambdaSubminute.Initializer"></a>

```typescript
import { LambdaSubminute } from 'cdk-lambda-subminute'

new LambdaSubminute(parent: Construct, name: string, props: LambdaSubminuteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.Initializer.parameter.parent">parent</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-lambda-subminute.LambdaSubminuteProps">LambdaSubminuteProps</a></code> | *No description.* |

---

##### `parent`<sup>Required</sup> <a name="parent" id="cdk-lambda-subminute.LambdaSubminute.Initializer.parameter.parent"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-lambda-subminute.LambdaSubminute.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-lambda-subminute.LambdaSubminute.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-lambda-subminute.LambdaSubminuteProps">LambdaSubminuteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-lambda-subminute.LambdaSubminute.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-lambda-subminute.LambdaSubminute.isConstruct"></a>

```typescript
import { LambdaSubminute } from 'cdk-lambda-subminute'

LambdaSubminute.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-lambda-subminute.LambdaSubminute.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.property.iteratorFunction">iteratorFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function that plays the role of the iterator. |
| <code><a href="#cdk-lambda-subminute.LambdaSubminute.property.stateMachineArn">stateMachineArn</a></code> | <code>string</code> | The ARN of the state machine that executes the target Lambda function per time unit less than one minute. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-lambda-subminute.LambdaSubminute.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `iteratorFunction`<sup>Required</sup> <a name="iteratorFunction" id="cdk-lambda-subminute.LambdaSubminute.property.iteratorFunction"></a>

```typescript
public readonly iteratorFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function that plays the role of the iterator.

---

##### `stateMachineArn`<sup>Required</sup> <a name="stateMachineArn" id="cdk-lambda-subminute.LambdaSubminute.property.stateMachineArn"></a>

```typescript
public readonly stateMachineArn: string;
```

- *Type:* string

The ARN of the state machine that executes the target Lambda function per time unit less than one minute.

---


### SubminuteStateMachine <a name="SubminuteStateMachine" id="cdk-lambda-subminute.SubminuteStateMachine"></a>

#### Initializers <a name="Initializers" id="cdk-lambda-subminute.SubminuteStateMachine.Initializer"></a>

```typescript
import { SubminuteStateMachine } from 'cdk-lambda-subminute'

new SubminuteStateMachine(scope: Construct, id: string, props: SubminuteStateMachineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-lambda-subminute.SubminuteStateMachineProps">SubminuteStateMachineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-lambda-subminute.SubminuteStateMachine.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-lambda-subminute.SubminuteStateMachine.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-lambda-subminute.SubminuteStateMachine.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-lambda-subminute.SubminuteStateMachineProps">SubminuteStateMachineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-lambda-subminute.SubminuteStateMachine.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-lambda-subminute.SubminuteStateMachine.isConstruct"></a>

```typescript
import { SubminuteStateMachine } from 'cdk-lambda-subminute'

SubminuteStateMachine.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-lambda-subminute.SubminuteStateMachine.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachine.property.stateMachine">stateMachine</a></code> | <code>aws-cdk-lib.aws_stepfunctions.StateMachine</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-lambda-subminute.SubminuteStateMachine.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="cdk-lambda-subminute.SubminuteStateMachine.property.stateMachine"></a>

```typescript
public readonly stateMachine: StateMachine;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.StateMachine

---


## Structs <a name="Structs" id="Structs"></a>

### IteratorLambdaProps <a name="IteratorLambdaProps" id="cdk-lambda-subminute.IteratorLambdaProps"></a>

#### Initializer <a name="Initializer" id="cdk-lambda-subminute.IteratorLambdaProps.Initializer"></a>

```typescript
import { IteratorLambdaProps } from 'cdk-lambda-subminute'

const iteratorLambdaProps: IteratorLambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.IteratorLambdaProps.property.targetFunction">targetFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function that is going to be executed per time unit less than one minute. |

---

##### `targetFunction`<sup>Required</sup> <a name="targetFunction" id="cdk-lambda-subminute.IteratorLambdaProps.property.targetFunction"></a>

```typescript
public readonly targetFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function that is going to be executed per time unit less than one minute.

---

### LambdaSubminuteProps <a name="LambdaSubminuteProps" id="cdk-lambda-subminute.LambdaSubminuteProps"></a>

#### Initializer <a name="Initializer" id="cdk-lambda-subminute.LambdaSubminuteProps.Initializer"></a>

```typescript
import { LambdaSubminuteProps } from 'cdk-lambda-subminute'

const lambdaSubminuteProps: LambdaSubminuteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.LambdaSubminuteProps.property.targetFunction">targetFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function that is going to be executed per time unit less than one minute. |
| <code><a href="#cdk-lambda-subminute.LambdaSubminuteProps.property.cronjobExpression">cronjobExpression</a></code> | <code>string</code> | A pattern you want this statemachine to be executed. |
| <code><a href="#cdk-lambda-subminute.LambdaSubminuteProps.property.frequency">frequency</a></code> | <code>number</code> | How many times you intent to execute in a minute. |
| <code><a href="#cdk-lambda-subminute.LambdaSubminuteProps.property.intervalTime">intervalTime</a></code> | <code>number</code> | Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute. |

---

##### `targetFunction`<sup>Required</sup> <a name="targetFunction" id="cdk-lambda-subminute.LambdaSubminuteProps.property.targetFunction"></a>

```typescript
public readonly targetFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function that is going to be executed per time unit less than one minute.

---

##### `cronjobExpression`<sup>Optional</sup> <a name="cronjobExpression" id="cdk-lambda-subminute.LambdaSubminuteProps.property.cronjobExpression"></a>

```typescript
public readonly cronjobExpression: string;
```

- *Type:* string
- *Default:* cron(50/1 15-17 ? * * *) UTC+0 being run every minute starting from 15:00 PM to 17:00 PM.

A pattern you want this statemachine to be executed.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)

---

##### `frequency`<sup>Optional</sup> <a name="frequency" id="cdk-lambda-subminute.LambdaSubminuteProps.property.frequency"></a>

```typescript
public readonly frequency: number;
```

- *Type:* number
- *Default:* 6

How many times you intent to execute in a minute.

---

##### `intervalTime`<sup>Optional</sup> <a name="intervalTime" id="cdk-lambda-subminute.LambdaSubminuteProps.property.intervalTime"></a>

```typescript
public readonly intervalTime: number;
```

- *Type:* number
- *Default:* 10

Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute.

---

### SubminuteStateMachineProps <a name="SubminuteStateMachineProps" id="cdk-lambda-subminute.SubminuteStateMachineProps"></a>

#### Initializer <a name="Initializer" id="cdk-lambda-subminute.SubminuteStateMachineProps.Initializer"></a>

```typescript
import { SubminuteStateMachineProps } from 'cdk-lambda-subminute'

const subminuteStateMachineProps: SubminuteStateMachineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachineProps.property.frequency">frequency</a></code> | <code>number</code> | How many times you intent to execute in a minute. |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachineProps.property.intervalTime">intervalTime</a></code> | <code>number</code> | Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute. |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachineProps.property.iteratorFunction">iteratorFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | the iterator Lambda function for the target Lambda function. |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachineProps.property.stateMachineName">stateMachineName</a></code> | <code>string</code> | the name of the state machine. |
| <code><a href="#cdk-lambda-subminute.SubminuteStateMachineProps.property.targetFunction">targetFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | the Lambda function that executes your intention. |

---

##### `frequency`<sup>Required</sup> <a name="frequency" id="cdk-lambda-subminute.SubminuteStateMachineProps.property.frequency"></a>

```typescript
public readonly frequency: number;
```

- *Type:* number
- *Default:* 6

How many times you intent to execute in a minute.

---

##### `intervalTime`<sup>Required</sup> <a name="intervalTime" id="cdk-lambda-subminute.SubminuteStateMachineProps.property.intervalTime"></a>

```typescript
public readonly intervalTime: number;
```

- *Type:* number
- *Default:* 10

Seconds for an interval, the product of `frequency` and `intervalTime` should be approximagely 1 minute.

---

##### `iteratorFunction`<sup>Required</sup> <a name="iteratorFunction" id="cdk-lambda-subminute.SubminuteStateMachineProps.property.iteratorFunction"></a>

```typescript
public readonly iteratorFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

the iterator Lambda function for the target Lambda function.

---

##### `stateMachineName`<sup>Required</sup> <a name="stateMachineName" id="cdk-lambda-subminute.SubminuteStateMachineProps.property.stateMachineName"></a>

```typescript
public readonly stateMachineName: string;
```

- *Type:* string

the name of the state machine.

---

##### `targetFunction`<sup>Required</sup> <a name="targetFunction" id="cdk-lambda-subminute.SubminuteStateMachineProps.property.targetFunction"></a>

```typescript
public readonly targetFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

the Lambda function that executes your intention.

---



