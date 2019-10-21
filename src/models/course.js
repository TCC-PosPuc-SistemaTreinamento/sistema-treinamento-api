'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    instructor: {
        type: String,
        required: true
    },
    units: [{
        name: {
            type: String,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        video: {
            url: {
                type: String,
                required: false
            },
            legend: {
                type: String,
                required: false
            }
        },
        material: {
            legend: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: false
            },
            attachment: {
                type: String,
                required: false  
            }
        },
        activity: {
            legend: {
                type: String,
                required: false
            },
            approvedGrade: {
                type: Number,
                required: false
            },
            questionBase: {
                // type: Schema.Types.ObjectId,
                type: String,
                required: false
            }
        }
    }]
});

module.exports.Course = mongoose.model('Course', schema, 'courses');