const Repository = require('../repositories/department.repository');

exports.getAll = async (req, res) => {
    try{
        const departments = await Repository.getAll();
        res.status(200).json(departments);
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        res.status(200).send({ message: 'department byId' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        let department = {
            name: req.body.name
        };
        const newDepartment = await Repository.create(department);
        res.status(200).json(newDepartment)
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'error' });
    }
}

exports.update = async (req, res) => {
    try{
        res.status(200).send({ message: 'department update' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).send({ message: 'department remove' })
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}