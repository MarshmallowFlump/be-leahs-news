const { 
    eraseComment
} = require('../models/index.models');

const { 
    validateCommentExists
} = require('../utils/utils');

exports.deleteComment = (req, res, next) => {

    const { comment_id } = req.params;

    validateCommentExists(comment_id)
    .then((commentExists) => {
        if (!commentExists) {
            return Promise.reject({ status: 404, msg: 'Invalid URL' });
        } else {
            eraseComment(comment_id)
            .then(() => {
            res.sendStatus(204);
            });
        };
    })
    .catch((err) => {
        next(err);
    });
};