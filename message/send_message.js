var settings = require('common/settings')
var RedisSMQ = require("rsmq");
var f = require('./common/functions');

exports.handler = function(e, ctx, callback) {

	var rsmq = new RedisSMQ(settings.REDIS_OPTIONS);
	let from = e.from;
	let to = e.to;
	let listener = e.listener;
	let message = e.message;
	let is_photo = e.is_photo

	if(f.isAnyNullOrEmpty(from, to, listener, message)) {
		callback(null, f.createResponse('', 
			'One of the following query strings were not passed or empty: from, to, listener, message', 
			'', 400));
			rsmq.quit();
	} else {
		if(f.isNullOrEmpty(is_photo))
			is_photo = false
		else if(typeof(is_photo) === 'string')
			is_photo = is_photo.toLowerCase() === 'true'
		else
			is_photo = false

		let json_serialzed_message = JSON.stringify({
			from: from,
			to: to,
			message: message,
			sent_timestamp: Date.now(),
			is_photo: is_photo
		});

		let cr_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${listener}`; 
        let cr_queue_namespace = `${cr_namespace}-${to}`; // Per user chat queue.
        console.log(`Message queue namespace: ${cr_queue_namespace}`)

		rsmq.sendMessage({qname: cr_queue_namespace, message:json_serialzed_message}, 
			function (err, resp) {
			if (err) {
				callback(null, f.createResponse('', err.message, '', 500));
			} else {
				callback(null, f.createResponse('', '', `Message ${json_serialzed_message} was queued.`, 200));
            } 
            rsmq.quit();
		});
	}
}
