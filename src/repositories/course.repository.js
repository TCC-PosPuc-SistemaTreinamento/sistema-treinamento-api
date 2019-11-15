const Course = require('../models/course').Course;

exports.getAll = async () => {
    return await Course.find({});
}

exports.getById = async (id) => {
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

exports.getCoursesByCategoryId = async (id) => {
    return await Course.find({
        category: id
    }, { _id: 1, name: 1});
}