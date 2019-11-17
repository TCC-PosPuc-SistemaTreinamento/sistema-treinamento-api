const dashboard = require('../controllers/dashboard.controller');

module.exports = (app) => {
    app.route('/api/dashboard')
        .get(dashboard.get);
}