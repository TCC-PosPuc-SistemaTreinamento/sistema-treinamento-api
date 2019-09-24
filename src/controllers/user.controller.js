const Repository = require('../repositories/user.repository');
const md5 = require('md5');
const authService = require('../services/auth.service');
const config = require('../../config/config');

exports.getAll = async (req, res) => {
    try{
        const users = await Repository.getAll();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Repository.getById(id);
        res.status(200).json( user )
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.email + config.tokenJWT),
            role: req.body.role
        }
        const newUser = await Repository.create(user);
        res.status(200).json( newUser )
    } catch (error) {
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
            email: req.body.email,
            password: md5(req.body.password + config.tokenJWT)
        });

        if(!user){
            res.status(400).json({ message: 'Usuário ou senha inválidos' });
            return;
        }

        const token = await authService.generateToken({
            email: user.email,
            name: user.name,
            role: user.role
        })

        res.status(200).json({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

    } catch(error) {
        res.status(200).json({ message: 'error' })
    }
}