const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    isScan: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Scan', scanSchema);