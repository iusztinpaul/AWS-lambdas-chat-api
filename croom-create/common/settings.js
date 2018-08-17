const REDIS_OPTIONS = {
    host: "lowkeyapp-redis-001.hznbrp.0001.euc1.cache.amazonaws.com",
    port: 6379,
    ns: 'cr'
    }

//namespaces
const CHAT_ROOM_NAMESPACE = 'cr'
const IS_WRITING_NAMESPACE = 'wrt'

//query string constants
const FROM = 'from'
const TO = 'to'
const LISTENER = 'listener'
const USERS = 'users'

module.exports = {
    REDIS_OPTIONS: REDIS_OPTIONS,
    CHAT_ROOM_NAMESPACE: CHAT_ROOM_NAMESPACE,
    IS_WRITING_NAMESPACE: IS_WRITING_NAMESPACE,
    FROM: FROM,
    TO: TO,
    LISTENER: LISTENER,
    USERS: USERS
}