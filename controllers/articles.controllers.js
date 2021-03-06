const { fetchArticleByID, 
        updateArticleVotesByID,
        fetchArticles,
        fetchArticleComments,
        addArticleComment,
} = require('../models/index.models')

const { validateArticleExists,
        validateUserExists,
} = require('../utils/utils');

exports.getArticles = (req, res, next) => {

    const { sort_by, order, topic} = req.query;
    
    fetchArticles(sort_by, order, topic)
    .then((allArticles) => {
        res.status(200).send({ articles: allArticles });
    })
    .catch((err) => {
        next(err);
    });
};

exports.getArticleByID = (req, res, next) => {

    const { article_id } = req.params;

    fetchArticleByID(article_id)
    .then((requiredArticle) => {
        if (requiredArticle.article === undefined) {
            return Promise.reject({ status: 404, msg: `Article with ID of '${article_id}' not found` });
        } else {
            res.status(200).send(requiredArticle);
        };
    })
    .catch((err) => {
        next(err);
    });
};

exports.patchArticleByID = (req, res, next) => {

    const { article_id } = req.params;
    const updatedArticleBody = req.body;

    updateArticleVotesByID(updatedArticleBody, article_id)
    .then((updatedArticle) => {
        res.status(200).send(updatedArticle);
    })
    .catch((err) => {
        next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
    fetchArticleComments(req.params.article_id)
    .then((allComments) => {
        res.status(200).send({ comments: allComments });  
    })
    .catch((err) => {
        next(err);
    });
};

exports.postArticleComment = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    const newComment = req.body;

    return validateArticleExists(article_id)
    .then((articleExists) => {
        if (articleExists) {
            if (username === undefined || body === undefined) {
                return Promise.reject({ status: 400, msg: 'Invalid input'})
            } else {
                return validateUserExists(username)
                .then((userExists) => {
                    if (userExists) {
                        return addArticleComment(article_id, newComment)
                        .then((postedComment) => {
                            res.status(201).send({ comment: postedComment });
                        });
                    } else {
                        return Promise.reject({ status: 404, msg: 'Invalid URL' });
                    }
                });
            }
        } else {
            return Promise.reject({ status: 404, msg: 'Invalid URL' });
        }
    })
    .catch((err) => {
        next(err);
    });
};
