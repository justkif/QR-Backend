const mongoose = require('mongoose');

const runnerSchema = new mongoose.Schema({
    ordinalNumber: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    area: {
        type: String,
        enum: ['ARHN', 'ARSG'],
        required: true
    },
    isPresent: {
        type: Boolean,
        default: false
    },
    timePresent: {
        type: Date,
        default: null
    },
    whoScan: {
        type: String,
        default: null,
        ref: 'User'
    },
    imageLink: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Runner', runnerSchema);