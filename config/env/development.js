global.SALT_KEY = 'c40b16a062f07eacaf5c7e54935120c6';

module.exports = {
    production: false,
    sandGridKey: 'xxx',
    tokenJWT: 'secret-jwt-token-auth',

    mongodb: {
        url: 'mongodb://xxx:yyy@ds129098.mlab.com:29098/sistema-treinamento',
        option: {
            user: 'xxx',
            pass: 'xxx',
            useMongoClient: true
        }
    }
}