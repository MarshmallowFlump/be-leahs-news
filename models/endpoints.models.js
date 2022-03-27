const db = require('../db/connection');
const fs = require('fs/promises');
                                 
exports.fetchEndpoints = () => {
    return fs
    .readFile('./routers/endpoints.json', 'utf8')
    .then((data) => {
        const endpoints = JSON.parse(data);
        return endpoints;
    })
    .catch((err) => {
        console.log('Error: file does not exist', err);
    });
};