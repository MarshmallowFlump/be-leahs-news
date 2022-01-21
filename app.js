const express = require('express');

const { 
    getTopics, 
    getArticleID,
    patchArticleID,
    getArticle,
    getArticleComments,
    postArticleComments,
    deleteComment,
    getAPI
} = require('./controllers/controller');

const {
    handleError404,
    otherErrors
} = require('./errors/index')

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticleID)
app.patch('/api/articles/:article_id', patchArticleID)
app.get('/api/articles', getArticle)
app.get('/api/articles/:article_id/comments', getArticleComments)
app.post('/api/articles/:article_id/comments', postArticleComments)
app.delete('/api/comments/:comment_id', deleteComment)
app.get('/api', getAPI)

app.use(handleError404);
app.use(otherErrors);


module.exports = app;