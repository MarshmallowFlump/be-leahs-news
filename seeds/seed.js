const format = require('pg-format')
const {formatTopicData, formatUserData, formatArticleData, formatCommentData} = require('../utils/seed-formatting')
const db = require('../db/connection');

function seed (data) {
  const {     articleData, commentData,     topicData,    userData   } = data;
  // 1. Create Tables
  return db
  .query('DROP TABLE IF EXISTS comments, articles, users, topics;')
  .then(() => {
    return db
    .query(`CREATE TABLE topics (
      slug VARCHAR (50) PRIMARY KEY NOT NULL,
      description VARCHAR (200)
    );`
    );
  })
  .then(() => {
    return db
    .query(`CREATE TABLE users (
      username VARCHAR (50) PRIMARY KEY,
      avatar_url VARCHAR (250),
      name VARCHAR (50) NOT NULL
    );`
    );
  })
  .then(() => {
    return db
    .query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR (250) NOT NULL,
      body VARCHAR (2000) NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
    );
  })
  .then(() => {
    return db
    .query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR (500)
    );`
    );
  })
  //2. Insert Data
  .then(() => {
    
    const formattedTopics = formatTopicData(topicData);
  
    const topicSQL = format(
      `INSERT INTO topics 
      (slug, description)
      VALUES
      %L
      RETURNING *;`, 
    formattedTopics
    ); 
        return db.query(topicSQL)
  })
  .then (() => {
    const formattedUsers = formatUserData(userData);

    const userSQL = format(
      `INSERT INTO users
      (username, avatar_url, name)
      VALUES
      %L
      RETURNING *;`,
      formattedUsers
    );
      return db.query(userSQL)
  })
  .then(() => {
    const formattedArticles = formatArticleData(articleData);

    const articleSQL = format(
      `INSERT INTO articles
      (title, body, votes, created_at, topic, author)
      VALUES
      %L
      RETURNING *;`,
      formattedArticles
    );
       return db.query(articleSQL)
  })
    .then(() => {
      const formattedComments = formatCommentData(commentData);
  
      const commentSQL = format(
        `INSERT INTO comments
        (author, article_id, votes, created_at, body)
        VALUES
        %L
        RETURNING *;`,
        formattedComments
      );
      return db.query(commentSQL)
  })
};

module.exports = seed;
