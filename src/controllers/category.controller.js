const Repository = require('../repositories/category.repository');

exports.getAll = async (req, res) => {
    try{
        const categories = await Repository.getAll();
        res.status(200).json(categories)
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id;
        const category = await Repository.getById(id);
        res.status(200).json( category )
    } catch (err) {
        console.log( err )
        res.status(400).json({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        let category = {
            name: req.body.name
        }
        const newCategory = await Repository.create(category);
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(400).send({ message: 'error' })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        const category = await Repository.getById(id);
        const newCategory = req.body;

        Object.assign(category, newCategory);
        
        await Repository.update(category);
        res.status(200).json( category )
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
}