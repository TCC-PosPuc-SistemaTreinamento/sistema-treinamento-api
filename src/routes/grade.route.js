let grade = require('../controllers/grade.controller');

module.exports = (app) => {
    app.route('/api/grades')
        .get(grade.getAll)
        .post(grade.create);

    app.route('/api/grades/:id')
        .get(grade.getById)
        .put(grade.update)
        .delete(grade.remove);
}