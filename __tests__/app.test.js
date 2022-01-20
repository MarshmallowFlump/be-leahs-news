const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../seeds/seed');
const request = require('supertest');
const app = require('../app');


beforeEach(() => seed(testData));
afterAll(() => db.end());

describe.only('GET /api/topics', () => {
    test('responds with status 200', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    })
    test('responds with status 200 and an object', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).not.toBeInstanceOf(Array);
         })
    })
    test('responds with a status 200 and an object containing an array', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((result) => {
            const topics = result.body.topics
            //console.log(topics)
            expect(topics).toBeInstanceOf(Array)
        })
    })
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
        )
    })
})


describe('GET /api/topics - Error Handling', () => {
    test('', () => {

    })
})

describe('GET /api/articles/:article_id', () => {
    test('', () => {

    });
});

describe('GET /api/articles/:article_id - Error Handling', () => {
    test('', () => {

    });
});

describe('PATCH /api/articles/:article_id', () => {
    test('', () => {

    });
});

describe('PATCH /api/articles/:article_id - Error Handling', () => {
    test('', () => {

    });
});

describe('GET /api/articles', () => {
    test('', () => {

    });
});

describe('GET /api/articles - Error Handling', () => {
    test('', () => {

    });
});

describe('GET /api/articles/:article_id/comments', () => {
    test('', () => {

    });
});

describe('GET /api/articles/:article_id/comments - Error Handling', () => {
    test('', () => {

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