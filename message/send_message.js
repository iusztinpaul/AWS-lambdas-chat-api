var settings = require('common/settings')
var RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ(settings.REDIS_OPTIONS);

exports.handle = function(e, ctx, cb) {

rsmq.createQueue({qname:"myqueue"}, function (err, resp) {
		if (resp===1) {
			console.log("queue created")
		}
});

rsmq.sendMessage({qname:"myqueue", message:"Hello World"}, function (err, resp) {
	if (resp) {
		console.log("Message sent. ID:", resp);
	}
});

rsmq.receiveMessage({qname:"myqueue"}, function (err, resp) {
	if (resp.id) {
		console.log("Message received.", resp)	
	}
	else {
		console.log("No messages for me...")
	}
});

rsmq.listQueues( function (err, queues) {
	if( err ){
		console.error( err )
		return
	}
	console.log("Active queues: " + queues.join( "," ) )
});

cb(null, { hello: 'world' })
  
}
