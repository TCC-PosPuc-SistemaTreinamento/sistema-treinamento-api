'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    keyWords: [],
    instructor: {
        type: String,
        required: true
    },
    visible: { type: Boolean, default: true },
    image: { type: String, default: false },
    units: [{
        name: { type: String, required: true },
        position: { type: Number, required: true },
        videos: [{
            url: { type: String, required: false },
            legend: { type: String, required: false }
        }],
        material: {
            legend: { type: String, required: false },
            type: { type: String, required: false },
            attachment: { type: String, required: false }
        },
        activity: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz',
            required: false
        },
    }],
    evaluates: [{
        userId: { type: String, required: false },
        comment: {type: String, required: false},
        rating: { type: Number, required: false },
    }]
});

module.exports.Course = mongoose.model('Course', schema, 'courses');