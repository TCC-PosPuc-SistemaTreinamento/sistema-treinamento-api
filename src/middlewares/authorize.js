const authService = require('../services/auth.service');
const config = require('../../config/config');
const utils = require('../services/utils.service');

module.exports = async(req, res, next) => {
    try{
        const module = utils.getModuleByUrl(req._parsedUrl.pathname),
              method = req.method;

        if(authService.dontNeedToAuthorize(module, method) || req._parsedUrl.pathname.includes('/courses/files/'))
            return next();
    
        authService.authorize(req, res, next);
    } catch (err) {
        console.log(err)
        res.status(401).send({ 'error' : 'Acesso negado' });
    }
}