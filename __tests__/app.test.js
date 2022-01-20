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
    test('responds with status 200 and an array', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
            expect(res.body).toBeInstanceOf(Array);
         })
    })
    test('responds with a status 200 and an array containing slug and description keys with correct values', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
            const topics = res.body;
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                )
            })
        })
    }) 
})

