const Repository = require('../repositories/role.repository');

exports.getAll = async (req, res) => {
    try{
        const roles = await Repository.getAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'role byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        let role = {
            name: req.body.name
        }
        const newRole = await Repository.create(role);
        res.status(200).json(newRole);
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'role update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'role remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}