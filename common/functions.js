var createResponse = function(data='', errorMessage='', infoMessage='', statusCode=0) {
    return {
        data: data,
        errorMessage: errorMessage,
        infoMessage: infoMessage,
        statusCode: statusCode
    };
}

var isNullOrEmpty = function(text) {
    return text === null || text === undefined || text.length === 0;
}

var isAnyNullOrEmpty = function(...lines) {
    return lines.some( (line) => {
        let result = false;
        if(Array.isArray(line)) 
            line.forEach( (elem) => {  
                result = result || isNullOrEmpty(elem);
            });
        
        return result || isNullOrEmpty(line);
    });
}

module.exports = {
    createResponse: createResponse,
    isNullOrEmpty: isNullOrEmpty,
    isAnyNullOrEmpty: isAnyNullOrEmpty
}