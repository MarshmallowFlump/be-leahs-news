const express = require('express');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const topicsRouter = require('./topics.router');
const endpointsRouter = require('./endpoints.router');

const apiRouter = express.Router();

//Articles router
apiRouter.use('/articles', articlesRouter);

//Comments router
apiRouter.use('/comments', commentsRouter);

//Topics router
apiRouter.use('/topics', topicsRouter);

//Endpoints router
apiRouter.use('/', endpointsRouter);

module.exports = apiRouter;