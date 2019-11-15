let watched = require('../controllers/watched.controller');

module.exports = (app) => {
    app.route('/api/watched')
        .post(watched.create);

    app.route('/api/watched/user')
        .get(watched.getWatchedByUser);

    app.route('/api/watched/course-user')
        .post(watched.getWatchedByCourseAndUser);

    app.route('/api/watched/course-user-unit')
        .post(watched.getWatchedByCourseUserUnit);
    
}