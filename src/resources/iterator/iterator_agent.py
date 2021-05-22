import boto3
import os

lambda_client = boto3.client("lambda")
target_function_name = os.environ['TARGET_FN_NAME']


def handler(event, context):
    index = event["iterator"]["index"] + 1
    response = lambda_client.invoke(
        FunctionName=target_function_name,
        InvocationType="Event"
    )
    return {
        "index": index,
        "continue": index < event["iterator"]["count"],
        "count": event["iterator"]["count"]
    }
