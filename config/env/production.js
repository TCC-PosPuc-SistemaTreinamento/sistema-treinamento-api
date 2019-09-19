module.exports = {
    production: true,
    sandGridKey: 'xxx',
    tokenJWT: 'yyy',
    mongodb: {
        url: 'mongodb://' + process.env.MONGO_LOGIN + ':' + process.env.PWD + '@' + process.env.DDDD,
        option: {
            useMongoClient: true
        }
    }
}