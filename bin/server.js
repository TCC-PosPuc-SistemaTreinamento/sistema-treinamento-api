process.env.PORT = process.env.PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const app = express();

require('../config/dbStart');

const cors = require('cors');
const bodyParser = require('body-parser');
// const courseRouter = require('../src/routes/course.route');
// const userRouter = require('../src/routes/user.route');
const routeIndex = require('../src/routes');

const port = '3000';

//routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/course', courseRouter);
// app.use('/user', userRouter)
// app.get('/', (req, res) => {
    //     return res.status(200).send({ message: 'API Sistema de Treinamento. Versão 1.0' });
    // })
app.use('/', routeIndex);


app.listen(process.env.PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', `App listening on PORT ${process.env.PORT} and Env: ${process.env.NODE_ENV}`);
});

module.exports = app;