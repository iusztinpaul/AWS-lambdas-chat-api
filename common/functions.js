var createResponse = function(data='', errorMessage='', infoMessage='', statusCode=0) {
    return JSON.stringify({
        data: data,
        errorMessage: errorMessage,
        infoMessage: infoMessage,
        statusCode: statusCode
    })
}

var isNullOrEmpty = function(text) {
    return text === '' || text === null || text === undefined;
}

var isAnyNullOrEmpty = function(...lines) {
    return lines.some( (line) => {
        return isNullOrEmpty(line);
    });
}

module.exports = {
    createResponse: createResponse,
    isNullOrEmpty: isNullOrEmpty,
    isAnyNullOrEmpty: isAnyNullOrEmpty
}