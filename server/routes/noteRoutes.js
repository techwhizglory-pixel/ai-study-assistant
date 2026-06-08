const express = require('express')
const router = express.Router()
const { uploadNote, getNotes, getNoteById, deleteNote } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../utils/upload')

router.post('/upload', protect, upload.single('file'), uploadNote)
router.get('/', protect, getNotes)
router.get('/:id', protect, getNoteById)
router.delete('/:id', protect, deleteNote)

module.exports = router