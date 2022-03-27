const express = require('express');

const { getArticleByID, 
        patchArticleByID, 
        getArticles,
        getArticleComments, 
        postArticleComment
    } = require('../controllers/articles.controllers');

const articlesRouter = express.Router();

//GET requests
articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleByID);

articlesRouter.get('/:article_id/comments', getArticleComments);

//PACH requests
articlesRouter.patch('/:article_id', patchArticleByID);

//POST requests
articlesRouter.post('/:article_id/comments', postArticleComment);

module.exports = articlesRouter;