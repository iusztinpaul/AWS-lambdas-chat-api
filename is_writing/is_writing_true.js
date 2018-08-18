var f = require('./is_writing_common')
var settings = require('./common/settings')

exports.handler = function(e, ctx, callback) {
    f.handler(e, ctx, callback, settings.TRUE);
}
