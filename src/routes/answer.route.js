let answer = require('../controllers/answer.controller');

module.exports = (app) => {
    app.route('/api/answers')
        .get(answer.getAll)
        .post(answer.create);

    app.route('/api/answers/:id')
        .get(answer.getById)
        .put(answer.update)
        .delete(answer.remove);
}