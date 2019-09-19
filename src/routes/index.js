const express = require('express');
const routes = express.Router();
const userRouter = require('./user.route');
const courseRouter = require('./course.route');

routes.use('/user', userRouter)
routes.use('/course', courseRouter)

routes.use('/', (req, res) => {
    res.status(200).send({ message: 'API version 1.0' })
})

module.exports = routes;