const authService = require('../services/auth.service');
const config = require('../../config/config');

module.exports = async(req, res, next) => {
    try{

        //condições para validar role de usuario e rotas que não precisam de autorização ou token

        authService.authorize(req, res, next);
    } catch (error) {
        res.status(401).send({ 'error' : 'Acesso negado jj' });
    }
}