var AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const targetFunctionName = process.env.TARGET_FN_NAME;

export const lambdaHandler = async (event: any): Promise<any> => {
  const index = event.iterator.index + 1;
  const params = {
    FunctionName: targetFunctionName,
    InvocationType: 'Event',
  };
  lambda.invoke(params, function (error: any) {
    if (error) { console.log(error, error.stack); } else { console.log('The target function is triggered.'); }

  });
  return {
    index: index,
    continue: index < event.iterator.count,
    count: event.iterator.count,
  };
};