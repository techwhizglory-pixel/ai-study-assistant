const Flashcard = require('../models/Flashcard')
const Note = require('../models/Note')
const { generateFlashcards } = require('../utils/aiService')

const generate = async (req, res) => {
    const { noteId } = req.body

    if (!noteId) {
        return res.status(400).json({ success: false, message: 'noteId is required' })
    }

    const note = await Note.findById(noteId)

    if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    const cards = await generateFlashcards(note.extractedText)

    const flashcard = await Flashcard.create({
        userId: req.user._id,
        noteId,
        cards
    })

    res.status(201).json({ success: true, flashcard })
}

const getFlashcards = async (req, res) => {
    const flashcard = await Flashcard.findOne({
        noteId: req.params.noteId,
        userId: req.user._id
    })

    if (!flashcard) {
        return res.status(404).json({ success: false, message: 'No flashcards found for this note' })
    }

    res.status(200).json({ success: true, flashcard })
}

const getAllFlashcards = async (req, res) => {
    const flashcards = await Flashcard.find({ userId: req.user._id })
        .populate('noteId', 'title')
        .sort({ createdAt: -1 })

    res.status(200).json({ success: true, count: flashcards.length, flashcards })
}

module.exports = { generate, getFlashcards, getAllFlashcards }