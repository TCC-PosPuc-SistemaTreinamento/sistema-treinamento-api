let category = require('../controllers/category.controller');

module.exports = (app) => {
    app.route('/api/categories')
        .get(category.getAll)
        .post(category.create);

    app.route('/api/categories/:id')
        .get(category.getById)
        .put(category.update);
}