const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../seeds/seed');
const request = require('supertest');
const app = require('../app');
const articles = require('../db/data/test-data/articles.js');
const { string } = require('pg-format');


beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
    test('responds with status 200', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    });
    test('responds with status 200 and an object', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).not.toBeInstanceOf(Array);
         });
    });
    test('responds with a status 200 and an object containing an array', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {
            const topics = result.body.topics
            //console.log(topics)
            expect(topics).toBeInstanceOf(Array)
        });
    });
    test('responds with a status 200 and an object containing an array of objects with keys of description and slug associated with values of the correct format', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {
            const topics = result.body.topics
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                )}
            )}
        );
    });
});


describe('GET /api/topics - Error Handling', () => {
    test('status 404: responds with an error message when there is a typo in the endpoint', () => {
        return request(app)
        .get('/api/toopics')
        .expect(404)
        .then(({res}) => {
            expect(res.statusMessage).toBe('Not Found')
        });
    });
});

describe('GET /api/articles/:article_id', () => {
    test('when given existing article_id responds with status code 200', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
    });
    test('when given existing article_id responds with status code 200 and an object with key of article', () => {
        const article_ID = 1;
        return request(app)
        .get(`/api/articles/${article_ID}`)
        .expect(200)
        .then(({ body }) => {
            expect(typeof body).toEqual('object')
            expect(body).not.toBeInstanceOf(Array);
            expect(Object.keys(body)).toEqual(['article'])
        });
    });
    test('when given existing article_id responds with status code 200 and an object containing an object with the key article containing author, title, article_id, body, topic, created_at, votes and comment_count properties', () => {
        const article_ID = 1;
        return request(app)
        .get(`/api/articles/${article_ID}`)
        .expect(200)
        .then(({body}) => {
            expect(typeof body).toBe('object')
            expect(body).not.toBeInstanceOf(Array)
            expect(Object.keys(body.article)).toEqual(['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count'])
        });
    });
    test('when given existing article_id responds with all of the above and values of article object keys are correct', () => {
        const article_ID = 1;
        return request(app)
        .get(`/api/articles/${article_ID}`)
        .expect(200)
        .then(({body}) => {
            expect(body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                body: 'I find this existence challenging',
                votes: 100, 
                topic: 'mitch',
                author: 'butter_bridge', 
                created_at: expect.any(String),
                comment_count: '11'
            });
        });
    });
});

describe('GET /api/articles/:article_id - Error Handling', () => {
    test('', () => {

    });
});

describe('PATCH /api/articles/:article_id', () => {
    test('responds with status 200', () => {
        return request(app)
        .patch("/api/articles/1")
        .send({
            inc_votes: 1
        })
        .expect(200)
    });
    test('responds with status 200 and the article object containing the article with the votes field incremented by the amount input via the patch request', () => {
        return request(app)
        .patch("/api/articles/1")
        .send({
            inc_votes: 1
        })
        .expect(200)
        .then((res) => {
            expect(res.body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                body: 'I find this existence challenging',
                votes: 101, 
                topic: 'mitch',
                author: 'butter_bridge', 
                created_at: expect.any(String),
                comment_count: '11'
            });
        });
    });
});

describe('PATCH /api/articles/:article_id - Error Handling', () => {
    test('', () => {

    });
});

describe('GET /api/articles', () => {
    test('responds with status 200, an object containing the key of articles and which contains an array of articles objects, each containing the relevant key-value pairs', () => {
        return request(app)
        .get(`/api/articles`)
        .expect(200) 
        .then((res) => {
           const results = res.body;
           expect(results).toBeInstanceOf(Object);
           expect(Object.keys(results)).toEqual(["articles"]);
           const articles = res.body.articles;
                    articles.forEach((article) => {
                        expect(article).toEqual(
                            expect.objectContaining({
                                author: expect.any(String),
                                title: expect.any(String),
                                article_id: expect.any(Number),
                                topic: expect.any(String),
                                created_at: expect.any(String),
                                votes: expect.any(Number),
                                comment_count: expect.any(String)
                        })
                    )
                })
            })
        });
    });
   
    test('200: articles are sorted by date descending by default', () => {
        return request(app)
        .get(`/api/articles`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            expect(results).toBeSortedBy('created_at', {
                descending: true,
            });
        });
    });
 
    test('200: articles can be sorted by date ascending with one query', () => {
        return request(app)
        .get(`/api/articles?order=asc`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            expect(results).toBeSortedBy('created_at', {descending: false})
        });
    });

    test('200: articles can be sorted by votes set as order desc by default', () => {
        return request(app)
        .get(`/api/articles?sort_by=votes`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            expect(results).toBeSortedBy('votes', {descending: true})
        });       
    });

    test('200: articles can be sorted by votes and ordered by an additional asc query', () => {
        return request(app)
        .get(`/api/articles?sort_by=votes&order=asc`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            expect(results).toBeSortedBy('votes', {descending: false})
        });      
    });

    test('200: articles can be sorted by comment_count set as order desc by default', () => {
        return request(app)
        .get(`/api/articles?sort_by=comment_count`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            expect(results).toBeSortedBy('comment_count', {coerce: true,  descending: true })
        });
    });

    test('200: articles can be sorted by comment_count and ordered by an additional asc query', () => {
        return request(app)
        .get(`/api/articles?sort_by=comment_count&order=asc`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            expect(results).toBeSortedBy('comment_count', {coerce: true, descending: false})
        });      
    });

    test('200: articles can be filtered by a topic query', () => {
        return request(app)
        .get(`/api/articles?topic=mitch`)
        .expect(200)
        .then((res) => {
            const results = res.body.articles;
            results.forEach((result) => {
                expect(result).toEqual(
                    expect.objectContaining({
                        'topic': 'mitch'
                    })
                )
            })
        })
    })

describe('GET /api/articles error handling', () => {
    test('', () => {

    });
});    

describe('GET /api/articles/:article_id/comments', () => {
    test('200: responds with an array of comments for given article id which should have the below properties', () => {
        return request(app)
        .get(`/api/articles/1/comments`)
        .expect(200)
        .then((res) => {
            const results = res.body.comments;
            results.forEach((result) => {
                expect(result).toEqual(
                    expect.objectContaining({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: 1
                    })
                );
            });
        });
    });
});

describe('GET /api/articles/:article_id/comments - Error Handling', () => {
    test('201: accepts a username and comment body and returns the whole comment object', () => {
        const newComment = {
            username: 'butter_bridge',
            body: 'I am a five star man!'
        };
        return request(app)
        .post(`/api/articles/1/comments`)
        .send(newComment)
        .expect(201)
        .then((res) => {
            const comment = res.body;
            expect(comment).toBeInstanceOf(Object);
            expect(comment.comment).toBeInstanceOf(Array);
            expect(comment.comment[0]).toMatchObject({
                comment_id: expect.any(Number),
                author: 'butter_bridge',
                article_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                body: 'I am a five star man!'
            });
        });
    });
});

describe('POST /api/articles/:article_id/comments', () => {
    test('', () => {

    });
});

describe('POST /api/articles/:article_id/comments - Error Handling', () => {
    test('', () => {

    });
});

describe('DELETE /api/comments/:comment_id', () => {
    test('', () => {

    });
});

describe('DELETE /api/comments/:comment_id - Error Handling', () => {
    test('', () => {

    });
});

describe('GET /api', () => {
    test('', () => {

    });
});

describe('GET /api - Error Handling', () => {
    test('', () => {

    });
});