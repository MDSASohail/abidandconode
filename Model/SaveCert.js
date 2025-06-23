const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    issuedBy: {
        type: String,
        required: true
    },
    dateOfIssue: {
        type: Date,
        required: true
    },
    validThrough: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
