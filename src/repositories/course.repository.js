const Course = require('../models/course').Course;

exports.getAll = async () => {
    return await Course.find({},{
        name: 1, instructor: 1, description: 1, category: 1
    });
}

exports.getById = async (id) => {
    return await Course.findById(id, {
        name: 1, instructor: 1, description: 1, category: 1
    })
}

exports.getByIdFull = async (id) => {
    return await Course.findById(id)
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