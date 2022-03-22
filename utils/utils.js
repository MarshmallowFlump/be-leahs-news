const db = require("../db/connection.js")

//Checks against the database to see whether an article by a given article_id exists
exports.validateArticleExists = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
        if (rows.length) {
            return true;
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
            return true;
        } else {
            return false;
        };
    });
};

//Checks against the database to see whether a comment by a given comment_id exists
exports.validateCommentExists = (comment_id) => {
    return db
    .query(`SELECT * FROM comments WHERE comment_id=$1`, [comment_id])
    .then(({ rows }) => {
        if (rows.length) {
            return true;
        } else {
            return false;
        };
    });
};