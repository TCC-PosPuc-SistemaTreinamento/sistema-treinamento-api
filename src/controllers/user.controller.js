const Repository = require('../repositories/user.repository');
const courseRepository = require('../repositories/course.repository');
const enrollRepository = require('../repositories/enrollment.repository');
const md5 = require('md5');
const authService = require('../services/auth.service');
const _ = require('lodash');
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
        delete user.password;

        console.log('lalal', user);
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
        res.status(400).json({ message: 'error', err })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        let user = await Repository.getById(id);
        const newUser = req.body;

        if(newUser.password && newUser.password !== '') {
            newUser.password = md5(newUser.password + config.tokenJWT);
        } else {
            delete user.password;
            delete newUser.password;
        }

        Object.assign(user, newUser);
        
        await Repository.update(user);
        res.status(200).json( user )
    } catch (err) {
        console.log(err)
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

exports.userProgress = async (req, res) => {
    try{
        const id = req.params.id;
        let userAllWatched = await enrollRepository.getUserAllWached(id);
        let userAllGrades = await enrollRepository.getUserAllGrades(id);
        for(let grade of userAllGrades){
            for(let watched of userAllWatched){
                if(String(grade.course._id) == String(watched.course._id))
                    grade.watched = watched.watched;
            }
        }
        res.status(200).json( userAllGrades );
    } catch(err) {
        console.log(err)
        res.status(400).json({ message: 'error' })
    }
}

exports.evaluates = async (req, res) => {
    try{
        const id = req.params.id;
        let userEvaluates = await courseRepository.getEvaluatesByUser(id);
        res.status(200).json( userEvaluates );
    } catch(err) {
        console.log(err)
        res.status(400).json({ message: 'error' })
    }
}

exports.authenticate = async (req, res) => {
    try{
        const user = await Repository.authenticate({
            username: req.body.username,
            password: md5(req.body.password + config.tokenJWT)
        });
        console.log(user)

        if(!user){
            res.status(400).json({ message: 'Usuário ou senha inválidos' });
            return;
        }

        if(!user.isActive) {
            return res.status(403).json({ message: 'Este usuário foi bloquado'})
        }

        const token = await authService.generateToken({
            id: user._id,
            username: user.username,
            name: user.name,
            privilege: user.privilege
        });

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                privilege: user.privilege,
                token: token
            }
        });

    } catch(error) {
        res.status(200).json({ message: 'error' })
    }
}

exports.changePassword = async (req, res) => {
    try {
        let { oldPassword, newPassword, userId } = req.body;

        const { password } = await Repository.updatePassword(userId);

        oldPassword = md5(oldPassword + config.tokenJWT);

        if( password !== oldPassword ) {
            return res.status(400).json({ 
                message: 'A senha inserida não é a sua senha atual!'
            });
        }

        const user = await Repository.getById(userId);

        user.password = md5(newPassword + config.tokenJWT);

        await Repository.update(user);

        return res.status(200).json({ id: user._id })

    } catch(error) {
        return res.status(400).json({ message: 'error' })
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
            success: true,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                privilege: user.privilege,
                token: tokenRefresh
            }
        });

    } catch(error) {
        res.status(200).json({ message: 'error' })
    }
}