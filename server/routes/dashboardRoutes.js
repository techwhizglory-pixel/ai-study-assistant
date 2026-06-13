const express = require('express')
const router = express.Router()
const { getOverview, getActivity, getHeatmap, getStreak, getQuizAnalytics, getDashboard, getPlanner } = require('../controllers/dashboardController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getDashboard)
router.get('/overview', protect, getOverview)
router.get('/activity', protect, getActivity)
router.get('/heatmap', protect, getHeatmap)
router.get('/streak', protect, getStreak)
router.get('/quizzes', protect, getQuizAnalytics)
router.get('/planner', protect, getPlanner)

module.exports = router