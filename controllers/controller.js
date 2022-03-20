const { fetchTopics,
        fetchArticleID,
        patchedArticleID,
        fetchArticles,
        fetchArticleComments,
        addArticleComment,
        fetchAPI,
        eraseComment
} = require('../models/model')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch(next);
};

exports.getArticleID = (req, res, next) => {
    const article_id = req.params.article_id;
    fetchArticleID(article_id)
    .then((article) => {
        res.status(200).send(article);
    })
    .catch(next);
};

exports.patchArticleID = (req, res, next) => {
    patchedArticleID(req.params.article_id, 1)
    .then((updatedArticle) => {
        res.status(200).send(updatedArticle);
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
    const { sort_by, order, topic} = req.query;
    fetchArticles(sort_by, order, topic)
    .then((allArticles) => {
        res.status(200).send({ articles: allArticles });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
    fetchArticleComments(req.params.article_id)
    .then((allComments) => {
        res.status(200).send({ comments: allComments });  
    })
    .catch(next);
};

exports.postArticleComment = (req, res, next) => {
    const newComment = { username: req.body.username, body: req.body.body};
    const article_id = Number(req.params.article_id);
    addArticleComment(newComment, article_id)
    .then((postedComment) => {
        res.status(201).send({ comment: postedComment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
    const comment_ID = Number(req.params.comment_id);
    eraseComment(comment_ID)
    .then(() => {
        res.sendStatus(204);
    })
    .catch(next);
};

exports.getAPI = (req, res, next) => {
    fetchAPI()
    .then((allEndPoints) => {
        res.status(200).send({ allEndPoints });
    })
    .catch(next);
};