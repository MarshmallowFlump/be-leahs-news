//This file includes functions for the purpose of formatting various data during the database seeding process

exports.formatTopicData = (topicData) => {
    const formattedTopics = topicData.map((topic) => [topic.slug, topic.description]);
    return formattedTopics;
};

exports.formatUserData = (userData) => {
    const formattedUsers = userData.map((user) => [user.username, user.avatar_url, user.name]);
    return formattedUsers;
};

exports.formatArticleData = (articleData) => {
    const formattedArticles = articleData.map((article) => {
        return [
            article.title,
            article.body,
            article.votes,
            article.created_at,
            article.topic,
            article.author
        ];
    });
    return formattedArticles;
};

exports.formatCommentData = (commentData) => {
    const formattedComments = commentData.map((comment) => {
        return [
            comment.author,
            comment.article_id,
            comment.votes,
            comment.created_at,
            comment.body
        ];
    });
    return formattedComments;
};

exports.createUserReference = (userRows) => {
    let ref = {};
    userRows.forEach((userRow) => {
        ref.username = userRow.username;
    });
    return ref;
};