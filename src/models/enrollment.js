'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enrollDate: { type: Date, default: new Date() },
    completed: { type: Boolean, default: false },
    completedDate: { type: Date }

});

module.exports.Enrollment = mongoose.model('Enrollment', schema, 'enrollment');


