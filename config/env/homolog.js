global.SALT_KEY = 'c40b16a062f07eacaf5c7e54935120c6';

module.exports = {
    production: false,
    sandGridKey: 'xxx',
    tokenJWT: 'secret-jwt-token-auth',

    mongodb: {
        url: process.env.MONGO_URL,
        option: {
            user: 'xxx',
            pass: 'xxx',
            useMongoClient: true
        }
    }
}