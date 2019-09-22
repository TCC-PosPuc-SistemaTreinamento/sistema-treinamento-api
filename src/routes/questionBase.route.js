let questionBase = require('../controllers/questionBase.controller');

module.exports = (app) => {
    app.route('/api/quastionBases')
        .get(questionBase.getAll)
        .post(questionBase.create);

    app.route('/api/quastionBases/:id')
        .get(questionBase.getById)
        .put(questionBase.update)
        .delete(questionBase.remove);
}