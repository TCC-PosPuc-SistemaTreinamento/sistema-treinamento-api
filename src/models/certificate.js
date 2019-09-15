'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model('Employee', schema);