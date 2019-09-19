const express = require('express');
const courseRoute = express.Router();
const courseController = require('../controllers/course.controller');

courseRoute.get('/', async (req, res) => {
    console.log('consegui chegar aki')
    const variable = await courseController.get();
    res.status(200).send({ message: 'course raiz = ' + variable })
});

courseRoute.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send({ message: 'course ID ' + id })
});

courseRoute.post('/', async (req, res) => {
    let teste = await courseController.getById(5);
    res.status(200).send({ message: 'Cadastro de curso' + teste })
})

courseRoute.put('/:id', (eq, res) => {
    res.status(200).send({ message: 'Atualização de curso' })
})

courseRoute.delete('/:id', (req, res) => {
    res.status(200).send({ message: 'Exclusão de curso' })
})

module.exports = courseRoute;