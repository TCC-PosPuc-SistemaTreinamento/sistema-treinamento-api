const Enrollment = require('../models/enrollment').Enrollment;

exports.getEnrolledByCourse = async (courseId) => {
    return await Enrollment.find({
        course: courseId
    });
}

exports.getCourseByUser = async (userId) => {
    return await Enrollment.find({ user: userId })
        .populate('course');
}

exports.getCertificates = async (userId) => {
    return await Enrollment.find({ 
        user: userId,
        completed: true
    }).populate('course');
}

exports.completeCourse = async (enrolled) => {
    let enroll = new Enrollment(enrolled);
    return await enroll.save();
}

exports.getEnrolled = async (courseId, userId) => {
    return await Enrollment.findOne({
        course: courseId,
        user: userId
    });
}

exports.create = async (courseId, userId) => {
    let enroll = new Enrollment({ course: courseId, user: userId });
    return await enroll.save();
}

// exports.update = async (role) => {
//     let newRole = new Role(role)
//     return await newRole.save();
// }

// exports.remove = async (id) => {
//     await Role.update({_id: id}, { isDeleted: true });
// }