let department = require('../controllers/department.controller');

module.exports = (app) => {
    app.route('/api/departments')
        .get(department.getAll)
        .post(department.create);

    app.route('/api/departments/:id')
        .get(department.getById)
        .put(department.update)
        .delete(department.remove);
}