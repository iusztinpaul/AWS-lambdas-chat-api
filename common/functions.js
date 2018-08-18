var createResponse = function(data='', errorMessage='', infoMessage='', statusCode=0) {
    return JSON.stringify({
        data: data,
        errorMessage: errorMessage,
        infoMessage: infoMessage,
        statusCode: statusCode
    })
}

module.exports = {
    createResponse: createResponse
}