const express = require('express')
const router = express.Router()
const { summarize, askAI } = require('../controllers/aiController')
const { protect } = require('../middleware/authMiddleware')

router.post('/summarize', protect, summarize)
router.post('/ask', protect, askAI)

module.exports = router