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
        const id = req.params.id;
        const department = await Repository.getById(id);
        res.status(200).json( department )
    } catch (err) {
        console.log( err )
        res.status(400).json({ message: 'error' })
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
        const id = req.params.id;
        const department = await Repository.getById(id);
        const newDepartment = req.body;

        Object.assign(department, newDepartment);
        
        await Repository.update(department);
        res.status(200).json( department )
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