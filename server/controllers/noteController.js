const Note = require('../models/Note')
const upload = require('../utils/upload')
const pdf = require('pdf-parse')
const fs = require('fs')

const uploadNote = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const { title, description, tags } = req.body

    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
    }

    let extractedText = ''

    if (req.file.mimetype === 'application/pdf') {
        const dataBuffer = fs.readFileSync(req.file.path)
        const pdfData = await pdf(dataBuffer)
        extractedText = pdfData.text
    } else {
        extractedText = fs.readFileSync(req.file.path, 'utf8')
    }

    const note = await Note.create({
        userId: req.user._id,
        title,
        description: description || '',
        tags: tags ? tags.split(',') : [],
        extractedText,
        fileUrl: req.file.path
    })

    res.status(201).json({ success: true, note })
}

const getNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: notes.length, notes })
}

const getNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    res.status(200).json({ success: true, note })
}

const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    fs.unlinkSync(note.fileUrl)
    await note.deleteOne()

    res.status(200).json({ success: true, message: 'Note deleted successfully' })
}

module.exports = { uploadNote, getNotes, getNoteById, deleteNote }