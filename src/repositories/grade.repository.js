const Grade = require('../models/grade').Grade;

exports.create = async (grade) => {
    let newGrade = new Grade(grade);
    return await newGrade.save();
}

// exports.update = async (grade) => {
//     let newGrade = new Grade(grade);
//     return await newGrade.save();
// }

exports.getByUser = async (userId) => {
    return await Grade.find({ user: userId })
}

exports.getByCourseAndUser = async (courseId, userId) => {
    return await Grade.find({ 
        course: courseId,
        user: userId 
    })
}

exports.getByCourseUserUnit = async (courseId, userId, unit) => {
    return await Grade.findOne({
        course: courseId,
        user: userId, 
        unit: unit
    })
}

exports.removeGrades = async (courseId, unit) => {
    await Grade.remove({
        course: courseId,
        unit: unit
    })
}