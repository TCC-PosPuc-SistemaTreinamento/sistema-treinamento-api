const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.status(200).send({ message: 'Rota User' })
})

module.exports = userRouter;