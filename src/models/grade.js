'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new mongoose.Schema({
    statement:{type:String, required: true},
    answerCorrect:{type:String, required: true},
    answerUser:{type:String, required: true},
    correct:{type:Boolean, default: false}
})

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
    unit: {
        type: Number,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    answers: [{
        type: Answer,
        required: true
    }]

});

module.exports.Grade = mongoose.model('Grade', schema, 'grades');