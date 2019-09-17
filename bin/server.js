const express = require('express');
const app = express();

const port = '3000';

//routes
app.get('/', (req, res) => {
    return res.status(200).send({ message: 'API Sistema de Treinamento. Versão 1.0' });
})
const courseRoute = require('../src/routes/course.route');
app.use('/course', courseRoute);


app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});