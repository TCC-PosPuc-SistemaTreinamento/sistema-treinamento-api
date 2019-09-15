'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        required: true
    }]
});

module.exports = mongoose.model('Employee', schema);