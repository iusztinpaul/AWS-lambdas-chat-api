var f = require('./common/functions')
var aws = require('aws-sdk');
aws.config.region = "eu-central-1";

exports.handler = function(e, ctx, callback) {

    let user = e.user
    let listener = e.listener
    let pageSize = e.size

    if(f.isAnyNullOrEmpty(user, listener, pageSize)) {
        callback(null, f.createResponse('',
            "Query string does not exist: from, to, listener, size OR there are empty messages", '', 400));
    } else {
        let lambda = new aws.Lambda();

        var params = {
            FunctionName: process.env.INVOKED_LAMBDA, // the lambda function we are going to invoke
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
          };
          
          let messages = [];
          for(let i=0; i < pageSize; i++) {

            params.Payload = JSON.stringify({
                listener: listener,
                user: user,
            });
            
            lambda.invoke(params, function(err, data) {
                if(err) {
                    callback(null, f.createResponse('', err.message, '', 500));
                } else {
                    let parsed_data = JSON.parse(data.Payload);
                    let parsed_data2 = JSON.parse(parsed_data);
                    
                    console.log(`Message ${i}: ${parsed_data}`);
                    
                    if(parsed_data2.data !== '') 
                        messages.push(parsed_data2.data);
                   
                    if(i === pageSize - 1) {
                        if(messages.length === 0)
                            callback(null, f.createResponse('',
                                "", 'There are no queued messages', 200));
                        else
                            callback(null, f.createResponse(messages,
                                "", '', 200));
                    }
                }
            });
        }
    }
}