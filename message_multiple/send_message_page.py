import boto3
import os
import json

import common_py.functions as f
import common_py.settings as s

def lambda_handler(event, context):
    
    resp = f.create_response_if_no_item(event, s.TO, s.FROM, s.LISTENER, 
                s.PAGE_SIZE, s.MESSAGES)
    if resp:
        return resp

    to = event[s.TO]
    fr = event[s.FROM]
    listener = event[s.LISTENER]
    messages = event[s.MESSAGES]
    page_size = event[s.PAGE_SIZE]
    print(f'Messages {messages}')

    if not isinstance(messages, list):
        return f.create_response(400, 'Messages are not a list')

    if len(messages) > page_size:
        return f.create_response(400, 'Sent more messages than the page size')
        
    payload = {
        s.TO: to,
        s.FROM: fr,
        s.LISTENER: listener
    }

    client = boto3.client('lambda')
    for message in messages:
        
        payload[s.KEY_MESSAGE] = message
        serialized_payload = json.dumps(payload)

        response = client.invoke(
        FunctionName=os.environ['INVOKED_LAMBDA'],
        InvocationType='RequestResponse',
        LogType= 'Tail',
        Payload=serialized_payload
        )
        
        data = response['Payload'].read().decode('utf-8')
        data = json.loads(data)
        print(data)

        # If there is an error send it further.
        if isinstance(data[s.KEY_ERROR],str) and not data[s.KEY_ERROR].__eq__(''):
            return f.create_response(500, 
                'Problems with lambda from url: \
                    /message -> POST with error: ' + data[s.KEY_ERROR])
        
    return f.create_response(200, '', f'{len(messages)} messages queued')
 

