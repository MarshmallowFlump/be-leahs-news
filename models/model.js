const db = require('../db/connection');

exports.fetchTopics = () => {
     return db.query(
         `SELECT * 
         FROM topics;`
         )
     .then(( { rows }) => {
     return rows;
    });
};

exports.fetchArticleID = (article_id) => {
    return db.query(
        `SELECT articles.*, 
        COUNT(comments.article_id)
        AS comment_count
        FROM articles 
        LEFT JOIN
        comments
        ON articles.article_id = comments.article_id
        WHERE articles.article_id= $1 GROUP BY articles.article_id;`, [article_id]
        )
    .then((result) => {
    const returnObject = { article: result.rows[0]}
    return returnObject;
    });
};  

exports.patchedArticleID = () => {

};

exports.fetchArticle = () => {

};

exports.fetchArticleComments = () => {

};

exports.postedArticleComments = () => {

};

exports.deletedComment = () => {

};

exports.fetchAPI = () => {

};


