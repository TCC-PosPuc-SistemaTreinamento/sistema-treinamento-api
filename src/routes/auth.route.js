const user = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/api/auth/authenticate')
        .post(user.authenticate);

    app.route('/api/auth/refresh-token')
        .post(user.refreshToken);
}