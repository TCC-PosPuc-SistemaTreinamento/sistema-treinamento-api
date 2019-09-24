const Repository = require('../repositories/user.repository');

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
        console.log(req.body)
        let user = req.body;
        console.log('fffff')
        console.log(user)
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