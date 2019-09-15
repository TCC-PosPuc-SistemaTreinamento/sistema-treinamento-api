'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    activity: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Answer', schema);