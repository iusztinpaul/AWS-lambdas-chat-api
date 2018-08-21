import boto3
import os
import json

import common_py.functions as f
import common_py.settings as s

def lambda_handler(event, context):
    
    resp = f.create_response_if_no_item(event, s.USER, s.LISTENER, s.PAGE_SIZE)
    if resp:
        return resp

    user = event[s.USER]
    listener = event[s.LISTENER]
    page_size = event[s.PAGE_SIZE]

    payload = json.dumps({
        s.USER: user,
        s.LISTENER: listener
    })

    client = boto3.client('lambda')
    messages = []
    for _ in range(page_size):

        response = client.invoke(
        FunctionName=os.environ['INVOKED_LAMBDA'],
        InvocationType='RequestResponse',
        LogType= 'Tail',
        Payload=payload
        )
        
        data = response['Payload'].read().decode('utf-8')
        data = json.loads(data)
        data = json.loads(data)
        print(data)

        # If it is not a dict it means that there is no message -> stop.
        if not isinstance(data[s.KEY_DATA], dict):
            break
        
        # Get only the message from the response
        data = data[s.KEY_DATA][s.KEY_MESSAGE]
        messages.append(data)
    
    if len(messages) is 0:
        return f.create_response(200, '', '', 'There are no messages')
        
    return f.create_response(200, '', messages)
 

