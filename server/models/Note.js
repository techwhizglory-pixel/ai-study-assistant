const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    tags: {
        type: [String],
        default: []
    },
    extractedText: {
        type: String,
        default: ''
    },
    fileUrl: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const Note = mongoose.model('Note', noteSchema)

module.exports = Note