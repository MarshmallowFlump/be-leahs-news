const express = require('express');

const { getEndpoints } = require('../controllers/index.controllers');

const endpointsRouter = express.Router();

//GET requests

endpointsRouter.get('/', getEndpoints);

module.exports = endpointsRouter;