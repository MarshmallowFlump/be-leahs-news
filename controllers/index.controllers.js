const {
    getArticles,
    getArticleByID,
    patchArticleByID,
    getArticleComments,
    postArticleComment
} = require('./articles.controllers');

const { deleteComment } = require('./comments.controllers');

const { getTopics } = require('./topics.controllers');

const { getEndpoints } = require('./endpoints.controller');

module.exports = {
    getArticles,
    getArticleByID,
    patchArticleByID,
    getArticleComments,
    postArticleComment,
    deleteComment,
    getTopics,
    getEndpoints
};
