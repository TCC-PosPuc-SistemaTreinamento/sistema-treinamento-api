'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        index: { unique: true },
    },
    name: {
        type: String,
        required: true
    },
    isActive: { 
        type: Boolean,
        default: true 
    },
    fisrtAccess: {
        type: Boolean,
        default: true
    },
    departament: {
        type: Schema.Types.ObjectId,
        ref: 'Departament',
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    privilege: {
        type: String,
        required: true,
        enum: ["user", "instructor", "admin"],
        default: "user"
    },
    picture: {
        type: String,
        required: false
    }
});

module.exports.User = mongoose.model('User', schema, 'users');