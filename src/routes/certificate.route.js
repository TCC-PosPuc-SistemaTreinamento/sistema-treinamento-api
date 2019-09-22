let certificate = require('../controllers/certificate.controller');

module.exports = (app) => {
    app.route('/api/certificates')
        .get(certificate.getAll)
        .post(certificate.create);

    app.route('/api/certificates/:id')
        .get(certificate.getById)
        .put(certificate.update)
        .delete(certificate.remove);
}