const db = require("../db/connection.js")

//Checks against the database to see whether an article by a given article_id exists
exports.validateArticleExists = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
        if (rows.length) {
            return true
        } else {
            return false;
        };
    });
};

//Checks against the database to see whether a user by a given username exists
exports.validateUserExists = (username) => {
    return db
    .query(`SELECT * FROM users WHERE username=$1`, [username])
    .then(({ rows }) => {
        if (rows.length) {
            return true
        } else {
            return false;
        };
    });
};