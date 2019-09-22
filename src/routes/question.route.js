let question = require('../controllers/question.controller');

module.exports = (app) => {
    app.route('/api/questions')
        .get(question.getAll)
        .post(question.create);

    app.route('/api/questions/:id')
        .get(question.getById)
        .put(question.update)
        .delete(question.remove);
}