const { fetchEndpoints } = require('../models/endpoints.models')

exports.getEndpoints = (req, res, next) => {
    fetchEndpoints()
    .then((allEndPoints) => {
        res.status(200).send({ allEndPoints });
    })
    .catch((err) => {
        next(err);
    });
};