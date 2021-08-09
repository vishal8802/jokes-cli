const request = require('request');

async function apiRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) {
                reject(error);
            }
            resolve(response.body);
        });
    });
}

module.exports = apiRequest;
