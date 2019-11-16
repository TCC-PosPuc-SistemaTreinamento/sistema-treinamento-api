const Enrollment = require('../models/enrollment').Enrollment;
const mongoose = require('mongoose');

exports.getEnrolledByCourse = async (courseId) => {
    return await Enrollment.find({
        course: courseId
    });
}

exports.getCourseByUser = async (userId) => {
    return await Enrollment.find({ user: userId })
        .populate('course', {
            name: 1, instructor: 1
        });
}

exports.getCertificates = async (userId) => {
    return await Enrollment.find({ 
        user: userId,
        completed: true
    }).populate('course', {
        name: 1, instructor: 1
    });
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

exports.getUserAllWached = async (user) => {
    const aggregate = [
        {
            $match: { "user": new mongoose.Types.ObjectId(user) }
        },
        {
            $lookup: {
                from: 'courses',
                localField: "course",
                foreignField: "_id",
                as: "course"
            }
        },
        {
            $unwind: {
                path: "$course",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: 'watched',
                localField: "course._id",
                foreignField: "course",
                as: "watched"
            }
        },
        {
            $unwind: {
                path: "$watched",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $match: { $or: [{ "watched.user": { $exists: false } }, { "watched.user": new mongoose.Types.ObjectId(user) }] }
        },
        {
            $group: {
                _id: "$_id",
                "course": { $first: "$course" },
                "user": { $first: "$user" },
                "watched": {
                    $push: { "user": "$watched.user", "course": "$watched.course", "unit": "$watched.unit", "watchedVideos": "$watched.watchedVideos" }
                }
            }
        }
    ];
    const res = await Enrollment.aggregate(aggregate);
    return res;
}

exports.getUserAllGrades = async (user) => {
    const aggregate = [
        {
            $match: { "user": new mongoose.Types.ObjectId(user) }
        },
        {
            $lookup: {
                from: 'courses',
                localField: "course",
                foreignField: "_id",
                as: "course"
            }
        },
        {
            $unwind: {
                path: "$course",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: 'grades',
                localField: "course._id",
                foreignField: "course",
                as: "grades"
            }
        },
        {
            $unwind: {
                path: "$grades",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $match: { $or: [{ "grades.user": { $exists: false } }, { "grades.user": new mongoose.Types.ObjectId(user) }] }
        },
        {
            $group: {
                _id: "$_id",
                "course": { $first: "$course" },
                "user": { $first: "$user" },
                "grades": {
                    $push: { "user": "$grades.user", "course": "$grades.course", "unit": "$grades.unit", "grade": "$grades.grade", "answers": "$grades.answers" }
                }
            }
        }
    ];
    const res = await Enrollment.aggregate(aggregate);
    return res;
}

// exports.update = async (role) => {
//     let newRole = new Role(role)
//     return await newRole.save();
// }

// exports.remove = async (id) => {
//     await Role.update({_id: id}, { isDeleted: true });
// }