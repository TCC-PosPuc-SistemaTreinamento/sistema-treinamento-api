'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new mongoose.Schema({
    statement: {type:String, required:true},
    alternativeA: {type:String, required:true},
    alternativeB: {type:String, required:true},
    alternativeC: {type:String, required:true},
    alternativeD: {type:String, required:true},
    alternativeCorrect: {type:Number, required:true}
})

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    questions: [{type:Question, required: false}]
});

module.exports.Quiz = mongoose.model('Quiz', schema, 'quizzes');