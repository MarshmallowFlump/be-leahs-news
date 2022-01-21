exports.handleError404 = (err, req, res, next) => {
    console.log(err)
    if (err.status === 404) {
        res.status(404).send({msg: 'Not found'});
    } else next (err);
};

exports.otherErrors = (err, req, res, next) => {
    console.log(err, '<< Error handling required')
    res.status(500).send({msg: 'Internal Server Error'});
}