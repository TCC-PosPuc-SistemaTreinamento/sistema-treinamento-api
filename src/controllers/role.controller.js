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
        const id = req.params.id;
        const role = await Repository.getById(id);
        res.status(200).json( role )
    } catch (err) {
        console.log( err )
        res.status(400).json({ message: 'error' })
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
        const id = req.params.id;
        const role = await Repository.getById(id);
        const newRole = req.body;

        Object.assign(role, newRole);
        
        await Repository.update(role);
        res.status(200).json( role )
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        const id = req.params.id;
        await Repository.remove(id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'error' })
    }
}