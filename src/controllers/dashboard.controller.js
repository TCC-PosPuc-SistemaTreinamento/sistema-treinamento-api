const courseRepository = require('../repositories/course.repository'),
    userRepository = require('../repositories/user.repository'),
    quizRepository = require('../repositories/quiz.repository'),
    categoryRepository = require('../repositories/category.repository'),
    enrollRepository = require('../repositories/enrollment.repository');

exports.get = async (req, res) => {
    try{
        const courses = await courseRepository.getQtd();
        const users = await userRepository.getQtd();
        const quizzes = await quizRepository.getQtd();
        const categories = await categoryRepository.getQtd();

        let allCourses = await courseRepository.getByDashboard();
        res.status(200).json({
            courses, users, quizzes, categories, allCourses
        });
    } catch(erro){
        res.status(400).json('erro')
    }
}
