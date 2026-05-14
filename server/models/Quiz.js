const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true }
})

const quizSchema = new mongoose.Schema({
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
    questions: [questionSchema],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    score: {
        type: Number,
        default: null
    }
}, { timestamps: true })

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz