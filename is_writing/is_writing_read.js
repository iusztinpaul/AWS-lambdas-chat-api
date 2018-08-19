var settings = require('common/settings')
var redis = require("redis");
var f = require('./common/functions')

exports.handler = function(e, ctx, callback, flag_value) {

	var redisClient = redis.createClient(settings.REDIS_OPTIONS);
	let user = e.user;
    let listener = e.listener;
    
    redisClient.on('connect', function(err) {
        if(err) {
            callback(f.createResponse('', err.message, '', 500));
            redisClient.quit();
        } else {
            if(f.isAnyNullOrEmpty(user, listener)) {
                callback(null, f.createResponse('', 
                    'One of the following query strings were not passed: listener, user', 
                    '', 400));
                    redisClient.quit();
            } else {
                let cr_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${listener}`; 
                let cr_queue_namespace = `${cr_namespace}-${user}`; // Per user chat queue.
                let cr_writing_flag_key = `${cr_queue_namespace}-${settings.IS_WRITING_NAMESPACE}`
                console.log(`Is writing flag key: ${cr_writing_flag_key}`)
                
                redisClient.get(cr_writing_flag_key, function(err, reply) {
                    if (err) {
                        callback(f.createResponse('', err.message, '', 500));
                    } else {
                        if(reply) {
                            if(reply === settings.TRUE)
                                reply = true
                            else if(reply === settings.FALSE)
                                reply = false
                            else reply = null
                            callback(null, f.createResponse(reply, '', '', 200));
                        }
                        else // if it does not exist it means that the user is not writing 
                            callback(null, f.createResponse(false,'','', 200))
                    } 
                    redisClient.quit();
                });
            }
        }
    });
}
