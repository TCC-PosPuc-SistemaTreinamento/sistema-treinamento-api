const mongoose = require('mongoose'),
    config = require('./config'),
    Grid = require('gridfs-stream');

let gfs;

mongoose.Promise = require('bluebird');

const mongoConnection = mongoose.connect(config.mongodb.url, config.mongodb.options);
mongoConnection
    .then(
        db => {
            console.log('\x1b[36m%s\x1b[0m', '\nMongoDB successfully connected')
            const conn = mongoose.connection;
            conn.once('open', () => {
                gfs = Grid(db, mongoose.mongo);
                gfs.collection('uploads');
            });
        },
        err => console.log('\x1b[33m%s\x1b[0m', '\nError while connecting to mongodb: ', err)
    );



module.exports = {
    mongoConnection: mongoConnection
};