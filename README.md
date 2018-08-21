# aws-lambdas-chat

Chat back-end implemented with aws Lambdas and aws ElastiCache - Redis.

# API
    /croom/iswriting -> POST, GET, DELETE (query params: user, listener)
    /croom/join -> POST, DELETE (query params: user, listener)
    /croom/message -> POST (params: from, to, listener AND body: message), 
                      GET(params: listener, user)
    /croom/message/page -> POST (params: from, to, listener, size AND body: [messages..]),
                           GET(params: user, listener, size)

## !!! Response has the following format !!!: 
```
    {
        data: data,
        errorMessage: errorMessage,
        infoMessage: infoMessage,
        statusCode: statusCode
    }
```

## Upload lambda to aws
    * copy the common folder to the lambda folder
    * run `npm install rsmq redis` in the desired folder
    * zip the node_modules, *.json files and the desired lambda function 
    * upload the *.zip to aws lambda functions

## clean.sh
    * script written in bash that deletes all the `zip` and common `files` from the subfolders (not the one from the main directory)
    * it is tested only on Linux (maybe it works on MAC OC, but on Windows surely it does not)