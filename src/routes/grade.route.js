let grade = require('../controllers/grade.controller');

module.exports = (app) => {
    app.route('/api/grades')
        .post(grade.create);

    app.route('/api/grades/user')
        .get(grade.getGradeByUser);

    app.route('/api/grades/course-user')
        .post(grade.getGradeByCourseAndUser);

    app.route('/api/grades/course-unit')
        .post(grade.remove);

    app.route('/api/grades/course-user-unit')
        .post(grade.getByGradeCourseUserUnit);
}