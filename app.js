const cors = require('cors');
const express = require('express');

const {
    handleCustomErrors,
    handlePSQLErrors,
    handleServerErrors,
    handle404s
} = require('./errors/index');

//Initialise the express server
const app = express();

//Utilise express.json() in order to manage JSON in endpoint requests
app.use(express.json());

//Initialise the cors middleware
app.use(cors());

//Set up the router
const apiRouter = require('./routers/api.router');

//Set up the /api endpoint
app.use('/api', apiRouter);

//Error handling
app.use(handle404s);
app.use(handleCustomErrors);
app.use(handlePSQLErrors)
app.use(handleServerErrors);

module.exports = app;