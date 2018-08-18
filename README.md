# aws-lambdas-chat

Chat back-end implemented with aws Lambdas and aws ElastiCache - Redis.

## Upload lambda to aws
    * copy the common folder to the lambda folder
    * run `npm install rsmq` in the desired folder
    * zip the node_modules, *.json files and the desired lambda function 
    * upload the *.zip to aws lambda functions

## clean.sh
    * script written in bash that deletes all the `zip` and common `files` from the subfolders (not the one from the main directory)
    * it is tested only on Linux (maybe it works on MAC OC, but on Windows surely it does not)