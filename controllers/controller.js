const { fetchTopics,
        fetchArticleID,
        patchedArticleID,
        fetchArticles,
        fetchArticleComments,
        postedArticleComments,
        deletedComment,
        fetchAPI
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
    .catch(next)
};

exports.getArticleComments = (req, res, next) => {
    fetchArticleComments(req.params.article_id)
    .then((allComments) => {
        res.status(200).send({ comments: allComments });  
    })
    .catch(next)
};

exports.postArticleComments = (req, res) => {

};

exports.deleteComment = (req, res) => {

};

exports.getAPI = (req, res) => {

};