let quiz = require('../controllers/quiz.controller');

module.exports = (app) => {
    app.route('/api/quizzes')
        .get(quiz.getAll)
        .post(quiz.create);

    app.route('/api/quizzes/:id')
        .get(quiz.getById)
        .put(quiz.update)
        .delete(quiz.remove);
}