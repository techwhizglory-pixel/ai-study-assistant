const mongoose = require('mongoose')

const flashcardSchema = new mongoose.Schema({
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
    cards: [
        {
            front: { type: String, required: true },
            back: { type: String, required: true }
        }
    ]
}, { timestamps: true })

const Flashcard = mongoose.model('Flashcard', flashcardSchema)

module.exports = Flashcard