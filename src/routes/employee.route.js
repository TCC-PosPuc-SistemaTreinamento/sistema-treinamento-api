let employees = require('../controllers/employee.controller');

module.exports = (app) => {
    app.route('/api/employees')
        .get(employees.getAll)
        .post(employees.create);

    app.route('/api/employees/:id')
        .get(employees.getById)
        .put(employees.update)
        .delete(employees.remove);
}