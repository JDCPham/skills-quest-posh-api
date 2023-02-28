"use strict";

module.exports.response = (statusCode, body)=>  {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
}