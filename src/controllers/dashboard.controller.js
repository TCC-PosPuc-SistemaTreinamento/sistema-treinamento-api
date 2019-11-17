const courseRepository = require('../repositories/course.repository'),
    userRepository = require('../repositories/user.repository'),
    quizRepository = require('../repositories/quiz.repository'),
    categoryRepository = require('../repositories/category.repository');

exports.get = async (req, res) => {
    try{
        const courses = await courseRepository.getQtd();
        const users = await userRepository.getQtd();
        const quizzes = await quizRepository.getQtd();
        const categories = await categoryRepository.getQtd();
    
        res.status(200).json({
            courses, users, quizzes, categories
        });
    } catch(erro){
        res.status(400).json('erro')
    }
}
