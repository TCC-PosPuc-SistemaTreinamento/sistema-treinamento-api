const Repository = require('../repositories/user.repository');
const md5 = require('md5');
const authService = require('../services/auth.service');
const config = require('../../config/config');

exports.getAll = async (req, res) => {
    try{
        const users = await Repository.getAll();
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Repository.getById(id);
        res.status(200).json( user )
    } catch (err) {
        console.log( err )
        res.status(400).json({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        let user = req.body;
        user.password = md5(user.password + config.tokenJWT);

        const newUser = await Repository.create(user);
        res.status(200).json( newUser )
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Repository.getById(id);
        const newUser = req.body;
        newUser.password = md5(newUser.password + config.tokenJWT);

        Object.assign(user, newUser);
        
        await Repository.update(user);
        res.status(200).json( user )
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Repository.remove(id);
        res.status(200).json( result )
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.authenticate = async (req, res) => {
    try{
        const user = await Repository.authenticate({
            username: req.body.username,
            password: md5(req.body.password + config.tokenJWT)
        });

        if(!user){
            res.status(400).json({ message: 'Usuário ou senha inválidos' });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            username: user.username,
            name: user.name,
            privilege: user.privilege
        });

        res.status(200).json({
            token: token,
            data: {
                id: user._id,
                username: user.username,
                name: user.name,
                privilege: user.privilege
            }
        });

    } catch(error) {
        res.status(200).json({ message: 'error' })
    }
}

exports.refreshToken = async (req, res) => {
    try{

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await Repository.getById(data.id);

        if(!user){
            res.status(401).json({ message: 'Usuário não encontrado' });
            return;
        }

        const tokenRefresh = await authService.generateToken({
            id: user._id,
            username: user.username,
            name: user.name,
            privilege: user.privilege
        });

        res.status(200).json({
            token: tokenRefresh,
            data: {
                id: user._id,
                username: user.username,
                name: user.name,
                privilege: user.privilege
            }
        });

    } catch(error) {
        res.status(200).json({ message: 'error' })
    }
}