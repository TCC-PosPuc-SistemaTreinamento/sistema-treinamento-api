'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    }
});

module.exports.User = mongoose.model('User', schema, 'users');