'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    unity: [{
        title: {
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
                required: true
            },
            legend: {
                type: String,
                required: true
            }
        },
        material: {
            legend: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            attachment: {
                type: String,
                required: true  
            }
        },
        activity: {
            legend: {
                type: String,
                required: true
            },
            approvedGrade: {
                type: Number,
                required: true
            },
            questionBase: {
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    }]
});

module.exports = mongoose.model('Employee', schema);