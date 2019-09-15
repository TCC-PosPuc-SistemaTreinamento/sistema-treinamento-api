'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        required: true
    },
    active: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Employee', schema);