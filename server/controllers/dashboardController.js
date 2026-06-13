const Note = require('../models/Note')
const Summary = require('../models/Summary')
const Flashcard = require('../models/Flashcard')
const Quiz = require('../models/Quiz')

const getOverview = async (req, res) => {
    try {
        const userId = req.user._id
        const [notes, summaries, flashcards, quizzes] = await Promise.all([
            Note.countDocuments({ userId }),
            Summary.countDocuments({ userId }),
            Flashcard.countDocuments({ userId }),
            Quiz.countDocuments({ userId })
        ])
        res.status(200).json({ success: true, data: { notes, summaries, flashcards, aiSessions: quizzes } })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getActivity = async (req, res) => {
    try {
        const userId = req.user._id
        const [notes, summaries, flashcards, quizzes] = await Promise.all([
            Note.find({ userId }).sort({ createdAt: -1 }).limit(5).select('title createdAt'),
            Summary.find({ userId }).sort({ createdAt: -1 }).limit(5).populate('noteId', 'title'),
            Flashcard.find({ userId }).sort({ createdAt: -1 }).limit(5).populate('noteId', 'title'),
            Quiz.find({ userId, score: { $ne: null } }).sort({ createdAt: -1 }).limit(5).populate('noteId', 'title')
        ])

        const activity = [
            ...notes.map(n => ({ type: 'note', title: `Uploaded note: ${n.title}`, createdAt: n.createdAt })),
            ...summaries.map(s => ({ type: 'summary', title: `Generated summary for: ${s.noteId?.title || 'a note'}`, createdAt: s.createdAt })),
            ...flashcards.map(f => ({ type: 'flashcard', title: `Generated flashcards for: ${f.noteId?.title || 'a note'}`, createdAt: f.createdAt })),
            ...quizzes.map(q => ({ type: 'quiz', title: `Completed quiz for: ${q.noteId?.title || 'a note'}`, createdAt: q.createdAt }))
        ]

        activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        res.status(200).json({ success: true, data: activity.slice(0, 10) })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getHeatmap = async (req, res) => {
    try {
        const userId = req.user._id
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const [notes, summaries, quizzes] = await Promise.all([
            Note.find({ userId, createdAt: { $gte: thirtyDaysAgo } }).select('createdAt'),
            Summary.find({ userId, createdAt: { $gte: thirtyDaysAgo } }).select('createdAt'),
            Quiz.find({ userId, createdAt: { $gte: thirtyDaysAgo } }).select('createdAt')
        ])

        const activityMap = {}
        const addToMap = (items) => {
            items.forEach(item => {
                const date = item.createdAt.toISOString().split('T')[0]
                activityMap[date] = (activityMap[date] || 0) + 1
            })
        }

        addToMap(notes)
        addToMap(summaries)
        addToMap(quizzes)

        const heatmap = Object.entries(activityMap)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date) - new Date(b.date))

        res.status(200).json({ success: true, data: heatmap })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getStreak = async (req, res) => {
    try {
        const userId = req.user._id
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const [notes, summaries, quizzes] = await Promise.all([
            Note.find({ userId, createdAt: { $gte: thirtyDaysAgo } }).select('createdAt'),
            Summary.find({ userId, createdAt: { $gte: thirtyDaysAgo } }).select('createdAt'),
            Quiz.find({ userId, createdAt: { $gte: thirtyDaysAgo } }).select('createdAt')
        ])

        const activeDays = new Set()
        const addDays = (items) => {
            items.forEach(item => {
                activeDays.add(item.createdAt.toISOString().split('T')[0])
            })
        }

        addDays(notes)
        addDays(summaries)
        addDays(quizzes)

        let currentStreak = 0
        let longestStreak = 0
        let tempStreak = 0
        const checkDate = new Date()

        for (let i = 0; i < 30; i++) {
            const dateStr = checkDate.toISOString().split('T')[0]
            if (activeDays.has(dateStr)) {
                tempStreak++
                if (i === 0 || currentStreak > 0) currentStreak = tempStreak
                longestStreak = Math.max(longestStreak, tempStreak)
            } else {
                if (i > 0) tempStreak = 0
            }
            checkDate.setDate(checkDate.getDate() - 1)
        }

        const days = []
        for (let i = 29; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const dateStr = d.toISOString().split('T')[0]
            days.push({ date: dateStr, studied: activeDays.has(dateStr) })
        }

        res.status(200).json({ success: true, data: { currentStreak, longestStreak, days } })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getQuizAnalytics = async (req, res) => {
    try {
        const userId = req.user._id
        const quizzes = await Quiz.find({ userId, score: { $ne: null } })
        const completed = quizzes.length
        const averageScore = completed > 0
            ? Math.round(quizzes.reduce((sum, q) => sum + (q.score / q.questions.length) * 100, 0) / completed)
            : 0

        res.status(200).json({ success: true, data: { completed, averageScore, weakAreas: [] } })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getDashboard = async (req, res) => {
    try {
        const userId = req.user._id

        const [notes, summaries, flashcards, quizzes] = await Promise.all([
            Note.countDocuments({ userId }),
            Summary.countDocuments({ userId }),
            Flashcard.countDocuments({ userId }),
            Quiz.countDocuments({ userId })
        ])

        const recentNotes = await Note.find({ userId }).sort({ createdAt: -1 }).limit(3).select('title createdAt')
        const recentQuizzes = await Quiz.find({ userId, score: { $ne: null } }).sort({ createdAt: -1 }).limit(3).populate('noteId', 'title')

        const completedQuizzes = await Quiz.find({ userId, score: { $ne: null } })
        const averageScore = completedQuizzes.length > 0
            ? Math.round(completedQuizzes.reduce((sum, q) => sum + (q.score / q.questions.length) * 100, 0) / completedQuizzes.length)
            : 0

        res.status(200).json({
            success: true,
            data: {
                overview: { notes, summaries, flashcards, aiSessions: quizzes },
                recentNotes,
                recentQuizzes,
                averageScore
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const getPlanner = async (req, res) => {
    try {
        const userId = req.user._id

        const [notes, summaries, flashcards, quizzes] = await Promise.all([
            Note.find({ userId }),
            Summary.find({ userId }).populate('noteId', 'title'),
            Flashcard.find({ userId }).populate('noteId', 'title'),
            Quiz.find({ userId, score: { $ne: null } }).populate('noteId', 'title')
        ])

        const tasks = []

        if (notes.length === 0) {
            tasks.push({
                title: 'Upload your first note',
                duration: '5 mins',
                priority: 'High',
                action: '/upload'
            })
        }

        notes.forEach((note) => {
            const summaryExists = summaries.some(
                (summary) => summary.noteId?._id.toString() === note._id.toString()
            )
            if (!summaryExists) {
                tasks.push({
                    title: `Generate summary for ${note.title}`,
                    duration: '2 mins',
                    priority: 'High',
                    action: `/summary/${note._id}`
                })
            }
        })

        summaries.forEach((summary) => {
            const flashcardExists = flashcards.some(
                (flashcard) => flashcard.noteId?._id.toString() === summary.noteId?._id.toString()
            )
            if (!flashcardExists) {
                tasks.push({
                    title: `Create flashcards for ${summary.noteId?.title}`,
                    duration: '3 mins',
                    priority: 'Medium',
                    action: `/flashcards/${summary.noteId?._id}`
                })
            }
        })

        quizzes.forEach((quiz) => {
            const score = (quiz.score / quiz.questions.length) * 100
            if (score < 70) {
                tasks.push({
                    title: `Review ${quiz.noteId?.title}`,
                    duration: '20 mins',
                    priority: 'High',
                    action: `/quiz/${quiz._id}`
                })
            }
        })

        if (tasks.length === 0) {
            tasks.push({
                title: 'Take a revision quiz',
                duration: '15 mins',
                priority: 'Low',
                action: '/dashboard'
            })
        }

        res.status(200).json({ success: true, data: tasks.slice(0, 5) })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { getOverview, getActivity, getHeatmap, getStreak, getQuizAnalytics, getDashboard, getPlanner }