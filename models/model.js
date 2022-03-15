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
    return db
    .query(
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

exports.patchedArticleID = (vote_increment, article_id) => {
    return exports.fetchArticleID(article_id)
    .then(({article}) => {
        let voteCount = article.votes;
        let voteIncrement = Number(vote_increment);
        let updatedVoteCount= voteCount + voteIncrement;
    return db
    .query(
        `UPDATE articles
        SET votes = $1
        WHERE article_id = $2
        RETURNING *;`,
        [updatedVoteCount, article_id]
    )
    .then(() => {
    return exports.fetchArticleID(article_id);
        });
    });
};

exports.fetchArticles = (
    sort_by = 'created_at', 
    order = 'desc', 
    topic
    ) => {

        const allowedSortBys = [
            'author',
            'title',
            'topic',
            'created_at',
            'votes',
            'comment_count',
            'author'
        ];

        const allowedOrder = [
            'asc', 
            'desc',
        ];

        const allowedTopics = [

        ]

        if (
            !allowedSortBys
            .includes(sort_by.toLowerCase())
        ) {
            return Promise.reject( { status: 400, msg: 'Bad request: Invalid sort query' });
        }

        if (
            !allowedOrder
            .includes(order.toLowerCase())
            ) {
                return Promise.reject({ status: 400, msg: 'Bad request: Invalid order query' });
            }
        
    let queryString = `
            SELECT 
                articles.*,
            COUNT (comments.comment_id)
            AS comment_count
            FROM articles
            LEFT JOIN
            comments
            ON comments.article_id = articles.article_id
            `;
        
        if (topic) {
            queryString += `
                 WHERE topic='${topic}'
                GROUP BY articles.article_id
                ORDER BY ${sort_by.toLowerCase()} ${order.toLowerCase()};
                `;
        } else {
            queryString += `
                 GROUP BY articles.article_id
                ORDER BY ${sort_by.toLowerCase()} ${order.toLowerCase()};
                `;
            };
    
            return db
                .query(queryString)
                .then((result) => {
        
                    const articlesArray = {articles: result.rows}

                return result.rows;
    });
};

exports.fetchArticleComments = () => {

};

exports.postedArticleComments = () => {

};

exports.deletedComment = () => {

};

exports.fetchAPI = () => {

};