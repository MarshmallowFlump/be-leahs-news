const express = require('express');

const { deleteComment } = require('../controllers/comments.controllers');

const commentsRouter = express.Router();

//DELETE requests
commentsRouter.delete('/:comment_id', deleteComment);

module.exports = commentsRouter;