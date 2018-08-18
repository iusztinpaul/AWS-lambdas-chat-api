var settings = require('common/settings')
var RedisSMQ = require("rsmq");
var f = require('./common/functions')

exports.handler = function(e, ctx, callback) {

	var rsmq = new RedisSMQ(settings.REDIS_OPTIONS);
	let user = e.user;
	let listener = e.listener;

	if(listener === undefined || user === undefined) {
		callback(null, f.createResponse('', 
			'One of the following query strings were not passed: listener, user', 
			'', 200));
			rsmq.quit();
	} else {
		let cr_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${listener}`; 
        let cr_queue_namespace = `${cr_namespace}-${user}`; // Per user chat queue.
        console.log(`Message queue namespace: ${cr_queue_namespace}`)

		rsmq.popMessage({qname: cr_queue_namespace}, 
			function (err, resp) {
			if (err) {
				callback(f.createResponse('', err.message, '', 500));
			} else {
                if(resp.id)
                    callback(null, f.createResponse(resp, '', '', 200));
                else
                    callback(null, f.createResponse('','','No messages', 200))
            } 
            rsmq.quit();
		});
	}
}
