'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports.Role = mongoose.model('Role', schema, 'roles');