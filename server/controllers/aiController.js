const Note = require('../models/Note')
const { summarizeText, askQuestion } = require('../utils/aiService')

const summarize = async (req, res) => {
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

    const summary = await summarizeText(note.extractedText)

    res.status(200).json({ success: true, summary, noteTitle: note.title })
}

const askAI = async (req, res) => {
    const { noteId, question } = req.body

    if (!noteId || !question) {
        return res.status(400).json({ success: false, message: 'noteId and question are required' })
    }

    const note = await Note.findById(noteId)

    if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    const answer = await askQuestion(note.extractedText, question)

    res.status(200).json({ success: true, answer, noteTitle: note.title })
}

module.exports = { summarize, askAI }