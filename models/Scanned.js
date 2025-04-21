const mongoose = require('mongoose');

const scannedSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    scanned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Runner'
    }]
});

module.exports = mongoose.model('Scanned', scannedSchema);