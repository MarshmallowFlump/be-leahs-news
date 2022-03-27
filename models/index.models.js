const {
    fetchArticleByID,
    updateArticleVotesByID,
    fetchArticles,
    fetchArticleComments,
    addArticleComment
} = require('./articles.models');

const { eraseComment } = require('./comments.models');
const { fetchTopics } = require('./topics.models');

module.exports = {
    fetchArticleByID,
    updateArticleVotesByID,
    fetchArticles,
    fetchArticleComments,
    addArticleComment,
    eraseComment,
    fetchTopics
};