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
    unit: {
        type: Number,
        required: true
    },
    watchedVideos: [{
        type: Number, required: false
    }]

});

module.exports.Watched = mongoose.model('Watched', schema, 'watched');