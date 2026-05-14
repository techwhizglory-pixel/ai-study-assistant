const Quiz = require('../models/Quiz')
const Note = require('../models/Note')
const { generateQuiz } = require('../utils/aiService')

const generate = async (req, res) => {
    const { noteId, count, difficulty } = req.body

    if (!noteId || !count || !difficulty) {
        return res.status(400).json({ success: false, message: 'noteId, count and difficulty are required' })
    }

    const note = await Note.findById(noteId)

    if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    const questions = await generateQuiz(note.extractedText, count, difficulty)

    const quiz = await Quiz.create({
        userId: req.user._id,
        noteId,
        questions,
        difficulty
    })

    res.status(201).json({ success: true, quiz })
}

const getQuiz = async (req, res) => {
    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz not found' })
    }

    if (quiz.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    res.status(200).json({ success: true, quiz })
}

const submitQuiz = async (req, res) => {
    const { answers } = req.body
    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz not found' })
    }

    if (quiz.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    let score = 0
    const results = quiz.questions.map((q, i) => {
        const isCorrect = answers[i] === q.answer
        if (isCorrect) score++
        return {
            question: q.question,
            yourAnswer: answers[i],
            correctAnswer: q.answer,
            isCorrect
        }
    })

    quiz.score = score
    await quiz.save()

    res.status(200).json({
        success: true,
        score,
        total: quiz.questions.length,
        percentage: Math.round((score / quiz.questions.length) * 100),
        results
    })
}

module.exports = { generate, getQuiz, submitQuiz }