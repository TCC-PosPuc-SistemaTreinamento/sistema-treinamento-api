const department = require('../controllers/department.controller'),
    authService = require('../services/auth.service');

module.exports = (app) => {
    app.route('/api/departments')
        // .get(authService.isAdmin, department.getAll)
        .get(department.getAll)
        .post(department.create);

    app.route('/api/departments/:id')
        .get(department.getById)
        .put(department.update)
        .delete(department.remove);
}