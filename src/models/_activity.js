'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    dataNasc: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    rg: {
        type: String,
        required: true
    },
    departament: {
    }
});

module.exports = mongoose.model('Employee', schema);