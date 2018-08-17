var RedisSMQ = require("rsmq");
var settings = require('./common/settings')
var rsmq = new RedisSMQ(settings.REDIS_OPTIONS)

exports.handler = function(e, ctx, callback) {

    let listener = e.listener;
    let users = e.users;

    if(listener == undefined || users == undefined) {
        callback(new Error("There are no listener or users passed as parameters"));
        rsmq.quit();
    } else {

        let cr_namespace = `${settings.CHAT_ROOM_NAMESPACE}-${listener}`;        
        users.forEach( (user, index) => {
            let cr_queue_namespace = `${cr_namespace}-${user}`; // Per user chat queue.

            rsmq.createQueue( {qname: cr_queue_namespace}, function (err, resp) {

                if(err) {
                    callback(err, 'sdfisdfi');
                    rsmq.quit();
                }

                if (resp===1 && users.length - 1 == index) {
                    callback(null, `Queues for chatroom ${cr_namespace} were created successfully`);
                    rsmq.quit(); // After creating the last queue close the redis client.
                }
            });
        });

        
    }
}