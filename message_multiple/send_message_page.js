var f = require('./common/functions')
var aws = require('aws-sdk');
aws.config.region = "eu-central-1";

exports.handler = function(e, ctx, callback) {

    let from = e.from
    let to = e.to
    let listener = e.listener
    let pageSize = e.size
    let messages = e.messages

    if(f.isAnyNullOrEmpty(from, to, listener, pageSize, messages)) {
        callback(null, f.createResponse('',
            "Query string does not exist: from, to, listener, size OR there are empty messages", '', 400));
    } else if (!Array.isArray(messages)) {
        callback(null, f.createResponse('',
            "Messages is not a list", '', 400));
    } else if ( messages.length > pageSize) {
        callback(null, f.createResponse('',
            `The page is too big -> \
            messages.length=${messages.length} > pageSize=${pageSize}`, '', 400));
    } else {
        let lambda = new aws.Lambda();

        var params = {
            FunctionName: process.env.INVOKED_LAMBDA, // the lambda function we are going to invoke
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
          };

        messages.forEach( (message, index) => {

            params.Payload = JSON.stringify({
                listener: listener,
                from: from,
                to: to,
                message: message
            });

            lambda.invoke(params, function(err, data) {
                if(err) {
                    callback(null, f.createResponse('', err.message, '', 500))
                } else {
                    console.log(`Message ${index}: ${data.Payload}`)
                }
            })            
        });
        
         callback(null, f.createResponse('',
            "All messages sent", '', 200));
    }
}