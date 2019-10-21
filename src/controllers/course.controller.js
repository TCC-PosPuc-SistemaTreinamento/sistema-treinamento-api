const Repository = require('../repositories/course.repository');

exports.getAll = async (req, res) => {
    try{
        const courses = await Repository.getAll();
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id;
        const course = await Repository.getById(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        const course = req.body;
        const newCourse = await Repository.create(course);
        res.status(200).json(newCourse)
    } catch (error) {
        res.status(400).json({ message: 'error', error })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        const course = await Repository.getById(id);
        const newCourse = req.body;
        
        Object.assign(course, newCourse);

        await Repository.update(course);
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).json({ message: 'course remove' })
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}