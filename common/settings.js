const REDIS_OPTIONS = {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
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

//true and false strings
const TRUE = 'true'
const FALSE = 'false'

module.exports = {
    REDIS_OPTIONS: REDIS_OPTIONS,
    CHAT_ROOM_NAMESPACE: CHAT_ROOM_NAMESPACE,
    IS_WRITING_NAMESPACE: IS_WRITING_NAMESPACE,
    FROM: FROM,
    TO: TO,
    LISTENER: LISTENER,
    USERS: USERS,
    TRUE: TRUE,
    FALSE: FALSE,
    MAX_MESSAGE_SIZE: -1 // In bytes. Allowed values: 1024-65536 and -1 (for unlimited size).
}