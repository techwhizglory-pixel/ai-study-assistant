const express = require('express')
const router = express.Router()
const { generate, getQuiz, submitQuiz } = require('../controllers/quizController')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate', protect, generate)
router.get('/:id', protect, getQuiz)
router.post('/:id/submit', protect, submitQuiz)

module.exports = router