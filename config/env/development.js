global.SALT_KEY = 'c40b16a062f07eacaf5c7e54935120c6';

module.exports = {
    production: false,
    sandGridKey: 'xxx',
    tokenJWT: 'secret-jwt-token-auth',

    mongodb: {
        url: 'mongodb://admin:admin@localhost:27017/sistema-treinamento',
        option: {
            user: 'xxx',
            pass: 'xxx',
            useMongoClient: true
        }
    }
}