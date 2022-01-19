const devData = require('../db/data/development-data/index');
const seed = require('./seed.js');
const db = require('../db/connection.js');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
