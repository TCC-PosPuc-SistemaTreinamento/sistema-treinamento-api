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

exports.authorize = function (req, res, next) {
    console.log('auau authservice')
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log('log do token')
    console.log( token )

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        console.log('chegeu i no au com token')
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