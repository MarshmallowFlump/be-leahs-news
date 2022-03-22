const db = require('../db/connection');
const fs = require("fs/promises");

exports.fetchTopics = () => {
     return db.query(
         `SELECT * 
         FROM topics;`
         )
     .then(( { rows } ) => {
     return rows;
    });
};

exports.fetchArticleByID = (article_id) => {            
    return db
    .query(
        `SELECT articles.*, 
        COUNT(comment_id)
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

exports.updateArticleVotesByID = (body, article_id) => {

    let { inc_votes } = body;

    if (inc_votes === undefined) {
        inc_votes = 0;
    }

    return db
    .query(
            `
            UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *
            ;`, 
            [inc_votes, article_id]
            )
            .then(({ rows }) => {
                if (!rows.length) {
                    return Promise.reject(( { status: 404, msg: `Article with ID of '${article_id}' not found`}))
                } else {
                    return db
                        .query(
                            `
                            SELECT articles.*, 
                            COUNT(comment_id)
                            AS comment_count
                            FROM articles 
                            LEFT JOIN comments
                            ON articles.article_id = comments.article_id
                            WHERE articles.article_id= $1 GROUP BY articles.article_id;`, [article_id]
                        )
                        .then((result) => {
                            const returnObject = {article: result.rows[0]};
                            return returnObject;
            });
        };
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

exports.fetchArticleComments = (article_ID) => {
    return db
    .query(
        `
        SELECT * 
        FROM comments
        WHERE article_id=${article_ID}
        ;`
        )
    .then(( { rows }) => {
    return rows;
   });
};

exports.addArticleComment = (newComment, article_id) => {
    const { username, body } = newComment;

    return db
    .query(
        `
        INSERT INTO comments
        (author, body, article_id)
        VALUES
        ($1, $2, $3)
        RETURNING *
        ;`,
        [username, body, article_id]
    )
    .then(( {rows} ) => {
    return rows;
    });
};

exports.eraseComment = (comment_id) => {
    return db
    .query(
        `DELETE FROM comments
        WHERE comment_id = $1
        ;`,
        [comment_id]
    )
    .then(( {rows} ) => {
        return rows;
    });
};

exports.fetchAPI = () => {
    return fs
    .readFile("./endpoints.json", "utf8")
    .then((data) => {
        const endpoints = JSON.parse(data);
        return endpoints;
    })
    .catch((err) => {
        console.log("Error: file does not exist", err);
    });
};