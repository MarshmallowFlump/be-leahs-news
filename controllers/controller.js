const { fetchTopics,
        fetchArticleID,
        patchedArticleID,
        fetchArticle,
        fetchArticleComments,
        postedArticleComments,
        deletedComment,
        fetchAPI
} = require('../models/model')

exports.getTopics = (req, res) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics});
    });
}

exports.getArticleID = (req, res) => {

}

exports.patchArticleID = (req, res) => {

}

exports.getArticle = (req, res) => {

}

exports.getArticleComments = (req, res) => {

}

exports.postArticleComments = (req, res) => {

}

exports.deleteComment = (req, res) => {

}

exports.getAPI = (req, res) => {

}