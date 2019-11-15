const Watched = require('../models/watched').Watched;

exports.create = async (watched) => {
    let newWatched = new Watched(watched);
    return await newWatched.save();
}

exports.getWatchedByUser = async (userId) => {
    return await Watched.find({ user: userId });
}

exports.getByCourseAndUser = async (courseId, userId) => {
    return await Watched.find({ 
        course: courseId,
        user: userId 
    })
}

exports.getByCourseUserUnit = async (courseId, userId, unit) => {
    return await Watched.findOne({
        course: courseId,
        user: userId, 
        unit: unit
    })
}