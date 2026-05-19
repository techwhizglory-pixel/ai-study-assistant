const express = require('express')
const router = express.Router()
const { summarize, askAI, getSummaries } = require('../controllers/aiController')
const { protect } = require('../middleware/authMiddleware')

router.post('/summarize', protect, summarize)
router.post('/ask', protect, askAI)
router.get('/summaries', protect, getSummaries)

module.exports = router