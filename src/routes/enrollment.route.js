let enroll = require('../controllers/enrollment.controller');

module.exports = (app) => {
    app.route('/api/enroll')
        .post(enroll.create);

    app.route('/api/enroll/course/:id')
        .get(enroll.getEnrolledByCourse)
        .put(enroll.completeCourse);

    app.route('/api/enroll/user/:id')
        .get(enroll.getCourseByUser);
    
    app.route('/api/enroll/user/:id/certificates')
        .get(enroll.getCertificates);
}