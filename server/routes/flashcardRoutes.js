const express = require('express')
const router = express.Router()
const { generate, getFlashcards, getAllFlashcards } = require('../controllers/flashcardController')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate', protect, generate)
router.get('/', protect, getAllFlashcards)
router.get('/:noteId', protect, getFlashcards)

module.exports = router