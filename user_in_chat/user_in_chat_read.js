var settings = require('common/settings')
var redis = require("redis");
var f = require('./common/functions')

exports.handler = function(e, ctx, callback) {

	var redisClient = redis.createClient(settings.REDIS_OPTIONS);
	let user = e.user;
    
    redisClient.on('connect', function(err) {
        if(err) {
            callback(null, f.createResponse('', err.message, '', 500));
            redisClient.quit();
        } else {
            if(f.isAnyNullOrEmpty(user)) {
                callback(null, f.createResponse('', 
                    'One of the following query strings were not passed: listener, user', 
                    '', 400));
                    redisClient.quit();
            } else {
                let in_chat_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${user}`;
                let in_chat_key = `${in_chat_namespace}-${settings.IN_CHAT_NAMESPACE}`
                console.log(`Is writing flag key: ${in_chat_key}`)
                
                redisClient.get(in_chat_key, function(err, reply) {
                    if (err) {
                        callback(null, f.createResponse('', err.message, '', 500));
                    } else {
                        if(reply) {
                            callback(null, f.createResponse(reply, '', '', 200));
                        }
                        else {
                            // if it does not exist it means that the user is not writing 
                            callback(null, f.createResponse(false,'','', 200));
                        }
                    } 
                    redisClient.quit();
                });
            }
        }
    });
}
