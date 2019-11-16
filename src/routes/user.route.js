let user = require('../controllers/user.controller');
const authService = require('../services/auth.service');

module.exports = (app) => {
    app.route('/api/users')
        .get(user.getAll)
        .post(authService.isAdmin, user.create);

    app.route('/api/users/change-password')
        .post(user.changePassword);

    app.route('/api/users/:id')
        .get(user.getById)
        .put(user.update)
        .delete(user.remove);
        
}