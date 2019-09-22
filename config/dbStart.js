const mongoose = require('mongoose'),
    config = require('./config');

mongoose.Promise = require('bluebird');

const mongoConnection = mongoose.connect(config.mongodb.url, config.mongodb.options);
mongoConnection
    .then(
        db => console.log('\x1b[36m%s\x1b[0m', '\nMongoDB successfully connected'),
        err => console.log('\x1b[33m%s\x1b[0m', '\nError while connecting to mongodb: ', err)
    );

module.exports = {
    mongoConnection: mongoConnection
};