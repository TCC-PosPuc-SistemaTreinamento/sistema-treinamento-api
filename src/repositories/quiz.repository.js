const Quiz = require('../models/quiz').Quiz;

exports.getAll = async () => {
    return await Quiz.find({})
        .populate('category');
}

exports.getById = async (id) => {
    return await Quiz.findById(id)
}

exports.create = async (quiz) => {
    let newQuiz = new Quiz(quiz)
    return await newQuiz.save();
}

exports.update = async (quiz) => {
    let newQuiz = new Quiz(quiz)
    return await newQuiz.save();
}

exports.getQuizzesByCategoryId = async (id) => {
    return await Quiz.find({
        category: id
    }, { _id: 1, title: 1});
}