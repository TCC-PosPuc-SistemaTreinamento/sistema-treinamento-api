const Course = require('../models/course').Course;

exports.getAll = async () => {
    return await Course.find({},{
        _id: 1, name: 1, instructor: 1, description: 1, category: 1, visible: 1, keyWords: 1
    });
}

exports.getById = async (id) => {
    return await Course.findById(id, {
        _id: 1, name: 1, instructor: 1, description: 1, category: 1, visible: 1, keyWords: 1, evaluates: 1
    })
}

exports.getByIdFull = async (id) => {
    return await Course.findById(id)
}

exports.getByDashboard = async () => {
    return await Course.find({})
        .populate('category')
        .sort({ name: 1 });
}

exports.getQtd = async() => {
    return await Course.count({});
}

exports.create = async (course) => {
    let newCourse = new Course(course)
    return await newCourse.save();
}

exports.update = async (course) => {
    let newCourse = new Course(course)
    return await newCourse.save();
}

exports.getCoursesByCategoryId = async (categoryId) => {
    return await Course.find({
        category: categoryId
    },
    { 
        _id: 1, 
        name: 1, 
        instructor: 1,
        visible: 1
    });
}

exports.getEvaluatesByUser = async (id) => {
    return await Course.aggregate([
        { '$unwind': "$evaluates" },
        { '$match': { "evaluates.userId": id } }
    ])
}