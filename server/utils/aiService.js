const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const summarizeText = async (text) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are an expert academic study assistant. Analyze the notes deeply and return ONLY a JSON object with no markdown, no explanation, just raw JSON.

Return exactly this structure:
{
  "overview": "A rich, detailed 4-5 sentence paragraph explaining the main topic, its importance, and real world application",
  "keyPoints": [
    "Point 1 — explain it fully in one clear sentence",
    "Point 2 — explain it fully in one clear sentence",
    "Point 3 — explain it fully in one clear sentence",
    "Point 4 — explain it fully in one clear sentence",
    "Point 5 — explain it fully in one clear sentence"
  ],
  "concepts": [
    "Concept 1 — brief definition",
    "Concept 2 — brief definition",
    "Concept 3 — brief definition"
  ],
  "studyTip": "One specific, actionable study tip tailored to this exact topic",
  "difficulty": "easy or medium or hard",
  "estimatedReadTime": "X minutes"
}`
            },
            {
                role: 'user',
                content: `Analyze and summarize these study notes thoroughly:\n\n${text}`
            }
        ],
        max_tokens: 2000,
        temperature: 0.7
    })
    const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
}

const askQuestion = async (text, question) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are an expert tutor helping a student understand their study material.

When answering:
- Start with a direct, clear answer to the question
- Then explain the concept in depth with examples
- Break down complex ideas into simple language
- Use bullet points or numbered steps where helpful
- End with a real world example or application
- Be thorough — students need complete understanding, not short answers
- If the question is not covered in the notes, say so clearly`
            },
            {
                role: 'user',
                content: `Here are my study notes:\n\n${text}\n\nMy question: ${question}\n\nPlease give me a thorough, well structured answer.`
            }
        ],
        max_tokens: 2000,
        temperature: 0.7
    })
    return response.choices[0].message.content
}

const generateQuiz = async (text, count, difficulty) => {
    const difficultyGuide = {
        easy: 'basic recall and definition questions that test fundamental understanding',
        medium: 'application questions that require understanding concepts and how they work together',
        hard: 'complex analysis and evaluation questions that require critical thinking and deep understanding'
    }

    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are an expert quiz creator for academic study. Generate exactly ${count} questions.

Difficulty: ${difficulty} — ${difficultyGuide[difficulty]}

Rules:
- Every question must test real understanding not just memorization
- Wrong options must be plausible and related to the topic
- Each question must have exactly 4 options labeled A B C D
- Include a clear explanation for the correct answer
- Return ONLY a JSON array, no markdown, no extra text

Format:
[
  {
    "question": "Clear, specific question?",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A",
    "explanation": "This is correct because..."
  }
]`
            },
            {
                role: 'user',
                content: `Generate ${count} ${difficulty} difficulty questions from these notes:\n\n${text}`
            }
        ],
        max_tokens: 3000,
        temperature: 0.7
    })
    const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
}

const generateFlashcards = async (text) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are a flashcard generator for academic study. Create clear, effective study flashcards.

Rules:
- Front should be a clear question or concept
- Back should be a complete, accurate answer or explanation
- Cover the most important concepts from the notes
- Keep fronts concise, backs can be detailed
- Generate between 10-15 flashcards
- Return ONLY a JSON array, no markdown

Format:
[
  {
    "front": "What is X?",
    "back": "X is... — detailed explanation here"
  }
]`
            },
            {
                role: 'user',
                content: `Generate comprehensive flashcards from these study notes:\n\n${text}`
            }
        ],
        max_tokens: 2000,
        temperature: 0.7
    })
    const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
}

module.exports = { summarizeText, askQuestion, generateQuiz, generateFlashcards }