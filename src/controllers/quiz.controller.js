const Repository = require('../repositories/quiz.repository');

exports.getAll = async (req, res) => {
    try{
        const quizzes = await Repository.getAll();
        res.status(200).json(quizzes)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id;
        const quiz = await Repository.getById(id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.create = async (req, res) => {
    try{
        const quiz = req.body;
        const newQuiz = await Repository.create(quiz);
        res.status(200).json(newQuiz)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'error', error: err })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        const quiz = await Repository.getById(id);
        const newQuiz = req.body;
        
        Object.assign(quiz, newQuiz);

        await Repository.update(quiz);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.remove = async (req, res) => {
    try{
        res.status(200).json({ message: 'quiz remove' })
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}

exports.getQuizzesByCategoryId = async (req, res) => {
    try{
        const id = req.params.id;
        const quizzes = await Repository.getQuizzesByCategoryId(id);
        res.status(200).json(quizzes)
    } catch (error) {
        res.status(400).json({ message: 'error' })
    }
}