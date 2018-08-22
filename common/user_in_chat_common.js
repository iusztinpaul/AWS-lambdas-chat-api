var settings = require('./settings')
var redis = require("redis");
var f = require('./functions')

exports.add_flag = function(callback, flag_value, user, succes_message) {

	var redisClient = redis.createClient(settings.REDIS_OPTIONS);
    
    redisClient.on('connect', function(err) {
        if(err) {
            callback(null, f.createResponse('', err.message, '', 500));
            redisClient.quit();
        } else {
            let in_chat_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${user}`;
            let in_chat_key = `${in_chat_namespace}-${settings.IN_CHAT_NAMESPACE}`
            console.log(`Is writing flag key: ${in_chat_key}`)
            
            redisClient.set(in_chat_key, flag_value, redis.print);
            callback(null, f.createResponse('','',
                        succes_message, 200));
            redisClient.quit();
        }
    });
}
