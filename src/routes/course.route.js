let course = require('../controllers/course.controller');

module.exports = (app) => {
    app.route('/api/courses')
        .get(course.getAll)
        .post(course.create);

    app.route('/api/courses/:id')
        .get(course.getById)
        .put(course.update)
        .delete(course.remove);
}