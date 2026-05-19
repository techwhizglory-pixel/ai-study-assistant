const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/noteRoutes')
const aiRoutes = require('./routes/aiRoutes')
const quizRoutes = require('./routes/quizRoutes')
const flashcardRoutes = require('./routes/flashcardRoutes')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/flashcards', flashcardRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})