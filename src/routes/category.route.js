let category = require('../controllers/category.controller');
let course = require('../controllers/course.controller');
let quiz = require('../controllers/quiz.controller');

module.exports = (app) => {
    app.route('/api/categories')
        .get(category.getAll)
        .post(category.create);

    app.route('/api/categories/:id')
        .get(category.getById)
        .put(category.update);
    
    app.route('/api/categories/:id/courses')
        .get(course.getCoursesByCategoryId);

    app.route('/api/categories/:id/quizzes')
        .get(quiz.getQuizzesByCategoryId);
}