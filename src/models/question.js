'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    statement: {
        type: String,
        required: true
    },
    correctAlternative: {
        id: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    alternatives: [{
        id: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Employee', schema);