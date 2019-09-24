global.SALT_KEY = 'c40b16a062f07eacaf5c7e54935120c6';

module.exports = {
    production: false,
    sandGridKey: 'xxx',
    tokenJWT: 'secret-jwt-token-auth',

    mongodb: {
        url: 'mongodb://recato:recato123@ds046549.mlab.com:46549/recato',
        option: {
            user: 'admin',
            pass: 'admin123',
            useMongoClient: true
        }
    }
}