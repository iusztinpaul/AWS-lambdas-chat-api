var settings = require('common/settings')
var redis = require("redis");
var f = require('./common/functions')

exports.handler = function(e, ctx, callback, flag_value) {

	var redisClient = redis.createClient(settings.REDIS_OPTIONS);
	let user = e.user;
    let listener = e.listener;
    
    redisClient.on('connect', function(err) {
        if(err) {
            callback(null, f.createResponse('', err.message, '', 500));
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
                console.log(`Is writing flag key: ${cr_writing_flag_key} set to ${flag_value}`)
                
                redisClient.set(cr_writing_flag_key, flag_value, redis.print);
                callback(null, f.createResponse('','',
                    `Flag for ${cr_writing_flag_key} set to ${flag_value}`, 200));
                redisClient.quit();
            }
        }
    });
}
