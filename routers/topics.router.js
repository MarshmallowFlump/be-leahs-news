const express = require('express');

const { getTopics } = require('../controllers/topics.controllers');

const topicsRouter = express.Router();

//GET requests
topicsRouter.get('/', getTopics);

module.exports = topicsRouter;