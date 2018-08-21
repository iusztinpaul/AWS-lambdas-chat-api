def create_response(status_code:int, error_message='', data='', delete_info_message='') -> dict:
    return {'statusCode': status_code, 
            'errorMessage': error_message,
            'deleteInfoMessage': delete_info_message,
            'data': data}

def check_event_for_item(event, item) -> bool:
    if item not in event:
        return False
    
    if isinstance(event[item], str) and event[item].__eq__(''):
        return False

    return True

def create_response_if_no_item(event, *items):
    for item in items:
        if not check_event_for_item(event, item):
            return create_response(400, f'One of the following items are not passed: {items}')

    return None