const { 
    formatTopicData,
    formatUserData,
    formatArticleData,
    formatCommentData,
} = require('../utils/seed-formatting');

const db = require('../db/connection');

afterAll(() => db.end());

describe('format topic data', () => {
    test('returns an empty array when topicData is empty', () => {
        const topicData = [];
        const output = formatTopicData(topicData);
        expect(output).toEqual([]);
    });
    test('returns a nested array with the correct order and formatting when passed one combination of slug and description as the topic data', () => {
        const topicData = [
            {slug: 'One slug', description: 'One description'}
        ];
        const output = formatTopicData(topicData);
        expect(output).toEqual([
            ['One slug', 'One description']
        ]);
    });
    test('returns multiple nested arrays with the correct order and formatting when passed multiple instances of slugs and descriptions as the topic data', () => {
        const topicData = [
            {slug: 'First slug', description: 'First description'},
            {slug: 'Second slug', description: 'Second description'}
        ];
        const output = formatTopicData(topicData);
        expect(output).toEqual([
            ['First slug', 'First description'],
            ['Second slug', 'Second description']
        ]);
    });
    test('function does not mutate the original topic data', () => {
        const testTopicData = [
            {slug: 'Slug', description: 'Description'}
        ];
        const unmutatedTopicData = [
            {slug: 'Slug', description: 'Description'}
        ];
        formatTopicData(testTopicData);
        expect(testTopicData).toEqual(unmutatedTopicData);
    });
});

describe('format user data', () => {
    test('returns an empty array when user data is empty', () => {
        const userData = [];
        const output = formatUserData(userData);
        expect(output).toEqual([]);
    });
    test('returns a nested array with the correct order of username, avatar url and name when passed one combination of the three as the user data', () => {
        const userData = [
            {
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
            }
        ];
        const output = formatUserData(userData);
        expect(output).toEqual([
           [ 
               'butter_bridge', 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg','jonny'
            ]
        ]);
    });
    test('returns multiple nested arrays with the correct order and formatting when passed multiple instances of username, name and avatar url as the user data', () => {
        const userData = [
            {
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
            },
            {
                username: 'icellusedkars',
                name: 'sam',
                avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'
              }
        ];
        const output = formatUserData(userData);
        expect(output).toEqual([
            [ 
                'butter_bridge', 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg','jonny'
             ],
             [
                'icellusedkars', 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4', 'sam'
             ]
        ]);
    });
    test('function does not mutate the original user data', () => {
        const testUserData = [
            {
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
            }
        ];
        const unmutatedUserData = [
            {
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
            }
        ]
        formatUserData(testUserData);
        expect(testUserData).toEqual(unmutatedUserData);
    });
});


describe('format article data', () => {
    test('returns an empty array when article data is empty', () => {
        const articleData = [];
        const output = formatArticleData(articleData);
        expect(output).toEqual([]);
    });
    test('returns a nested array with the correct order of title, body, votes, created_at, topic, author whenp passed one combination of these as the article data', () => {
        const articleData = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: new Date(1594329060000),
                votes: 100
              }
        ];
        const output = formatArticleData(articleData);
        expect(output).toEqual([
            [
                'Living in the shadow of a great man', 
                'I find this existence challenging', 
                100, 
                new Date(1594329060000),
                'mitch', 
                'butter_bridge', 
            ]
        ]);
    });
    test('returns multiple nested arrays with the correct order and formatting when passed multiple instances of unformatted article data', () => {
        const articleData = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: new Date(1594329060000),
                votes: 100
            },
            {
                title: 'Eight pug gifs that remind me of mitch',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'some gifs',
                created_at: new Date(1604394720000),
                votes: 0
            }
        ];
        const output = formatArticleData(articleData);
        expect(output).toEqual([
            [
                'Living in the shadow of a great man', 
                'I find this existence challenging', 
                100, 
                new Date(1594329060000),
                'mitch', 
                'butter_bridge', 
            ],
            [
                'Eight pug gifs that remind me of mitch', 
                'some gifs', 
                0, 
                new Date(1604394720000),
                'mitch', 
                'icellusedkars', 
             
            ]
        ]);
    });
    test('function does not mutate the original article data', () => {
        const testArticleData = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: new Date(1594329060000),
                votes: 100
              }
        ];
        const unmutatedArticleData = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: new Date(1594329060000),
                votes: 100
              }
        ]
        formatArticleData(testArticleData);
        expect(testArticleData).toEqual(unmutatedArticleData);
    });
});

describe('format comment data', () => {
    test('returns an empty array when comment data is empty', () => {
        const commentData = [];
        const output = formatCommentData(commentData);
        expect(output).toEqual([]);
    });
    test('returns a nested array with the correct order of author, article_id, votes, created_at and body when passed one combination of these as the comment data', () => {
        const commentData = [
            {   
                body: "Lobster pot",
                votes: 0,
                author: "icellusedkars",
                article_id: 1,
                created_at: new Date(1589577540000)
            }
        ];
        const output = formatCommentData(commentData);
        expect(output).toEqual([
            [
                "icellusedkars",
                1,
                0,
                new Date(1589577540000),
                "Lobster pot"
            ]
        ]);
    });
    test('returns multiple nested arrays with the correct order and formatting when passed multiple instances of unformatted comment data', () => {
        const commentData = [
            {   
                body: "Lobster pot",
                votes: 0,
                author: "icellusedkars",
                article_id: 1,
                created_at: new Date(1589577540000)
            },
            {
                body: "Delicious crackerbreads",
                votes: 0,
                author: "icellusedkars",
                article_id: 1,
                created_at: new Date(1586899140000),
            }
        ];
        const output = formatCommentData(commentData);
        expect(output).toEqual([
            [
                "icellusedkars",
                1,
                0,
                new Date(1589577540000),
                "Lobster pot"
            ],
            [
                "icellusedkars",
                1,
                0,
                new Date(1586899140000),
                "Delicious crackerbreads"
            ]
        ]);
    });
    test('function does not mutate the original comment data', () => {
        const testCommentData = [
            {   
                body: "Lobster pot",
                votes: 0,
                author: "icellusedkars",
                article_id: 1,
                created_at: new Date(1589577540000)
            }
        ];
        const unmutatedCommentData = [
            {   
                body: "Lobster pot",
                votes: 0,
                author: "icellusedkars",
                article_id: 1,
                created_at: new Date(1589577540000)
            }
        ]
        formatCommentData(testCommentData);
        expect(testCommentData).toEqual(unmutatedCommentData);
    });
});