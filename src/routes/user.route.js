let user = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/api/users')
        .get(user.getAll)
        .post(user.create);

    app.route('/api/users/authenticate')
        .post(user.authenticate);

    app.route('/api/users/refresh-token')
        .post(user.refreshToken);

    app.route('/api/users/:id')
        .get(user.getById)
        .put(user.update)
        .delete(user.remove);

}