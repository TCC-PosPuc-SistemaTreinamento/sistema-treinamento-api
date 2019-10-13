'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.generateToken = async (data) => {
    console.log('dados que serao token')
    return jwt.sign(data, config.tokenJWT, { expiresIn: '3d' });
}

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, config.tokenJWT);
    return data;
}

exports.dontNeedToAuthorize = (module, method) => {
    return (module == 'auth' && method == 'POST');
}

exports.authorize = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, config.tokenJWT, function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                })
            } else {
                next();
            }
        })
    }
}

exports.isAdmin = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, config.tokenJWT, function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                })
            } else {
                if(decoded.privilege == 'admin') {
                    next();
                } else {
                    res.status(403).json({ 
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        })
    }
}