const cors = require('cors');
const express = require('express');

const { 
    getTopics, 
    getArticleByID,
    patchArticleByID,
    getArticles,
    getArticleComments,
    postArticleComment,
    deleteComment,
    getAPI
} = require('./controllers/controller');

const {
    handleCustomErrors,
    handlePSQLErrors,
    handleServerErrors,
    handle404s
} = require('./errors/index')

//Initialise the express server
const app = express();

//Initialise the cors middleware
app.use(cors());

//Utilise express.json() in order to manage JSON in endpoint requests
app.use(express.json());

//Endpoints
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticleByID)
app.patch('/api/articles/:article_id', patchArticleByID)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getArticleComments)
app.post('/api/articles/:article_id/comments', postArticleComment)
app.delete('/api/comments/:comment_id', deleteComment)
app.get('/api', getAPI)

//Error handling
app.use(handle404s);
app.use(handleCustomErrors);
app.use(handlePSQLErrors)
app.use(handleServerErrors);


module.exports = app;