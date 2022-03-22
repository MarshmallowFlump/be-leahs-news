exports.handle404s = (req, res) => {
    res.status(404).send({ msg: 'Invalid URL'});
};

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    } else {
        next (err);
    };
};

exports.handlePSQLErrors = (err, req, res, next) => {
    if (
        err.code === '22P02' ||
        err.code === '23502' ||
        err.code === '42703' ||
        err.code === '42P01' ||
        err.code === '23503'
        ) {
        res.status(400).send({msg: 'Invalid input'});
    } else {
        next (err);
    };
};

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err, '<< Error handling required')
    res.status(500).send({msg: 'Internal Server Error'});
}

