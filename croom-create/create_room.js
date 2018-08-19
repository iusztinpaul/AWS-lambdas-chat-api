var RedisSMQ = require("rsmq");
var settings = require('./common/settings')
var f = require('./common/functions')

exports.handler = function(e, ctx, callback) {
    
    let rsmq = new RedisSMQ(settings.REDIS_OPTIONS)
    let listener = e.listener;
    let user = e.user;

    if(f.isAnyNullOrEmpty(listener, user)) {
        callback(f.createResponse('',"There are no listener or user passed as parameters", '', 400));
        rsmq.quit();
    } else {
        let cr_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${listener}`; 
        let cr_queue_namespace = `${cr_namespace}-${user}`; // Per user chat queue.
            
        rsmq.createQueue( {qname: cr_queue_namespace}, function (err, resp) {
            if(err) {
                callback(null, f.createResponse('', err.message, '', 500));
            } else {
                callback(null, f.createResponse('', '', `Queue ${cr_queue_namespace} was created.`, 200));
            } 
            rsmq.quit();
        });
    }
}