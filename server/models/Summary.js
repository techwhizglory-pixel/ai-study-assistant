const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    },
    summary: {
        overview: String,
        keyPoints: [String],
        concepts: [String],
        studyTip: String,
        difficulty: String
    }
}, { timestamps: true })

const Summary = mongoose.model('Summary', summarySchema)

module.exports = Summary