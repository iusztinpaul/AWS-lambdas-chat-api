var redis = require('redis');
var client = redis.createClient(6379, 'lowkeyapp-redis.hznbrp.ng.0001.euc1.cache.amazonaws.com');

exports.handle = function(e, ctx, cb) {

  client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

client.set('my test key', 'my test value', redis.print);
client.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});

  cb(null, { hello: 'world' })
}
