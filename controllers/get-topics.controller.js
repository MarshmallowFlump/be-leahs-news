const { fetchTopics } = require('../models/get-topics.model')

exports.getTopics = (req, res) => {
    fetchTopics()
    .then((topics) => {
       // console.log(topics)
        res.status(200).send(topics);
    });
}