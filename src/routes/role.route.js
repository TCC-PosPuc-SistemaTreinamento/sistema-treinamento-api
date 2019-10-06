let role = require('../controllers/role.controller');

module.exports = (app) => {
    app.route('/api/roles')
        .get(role.getAll)
        .post(role.create);

    app.route('/api/roles/:id')
        .get(role.getById)
        .put(role.update)
        .delete(role.remove);
}