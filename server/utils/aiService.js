const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const summarizeText = async (text) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are an expert academic study assistant. Return ONLY a JSON object, no markdown.

Return exactly this structure:
{
  "overview": "3-4 sentence paragraph about the topic",
  "keyPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "concepts": ["Concept 1", "Concept 2", "Concept 3"],
  "studyTip": "One specific study tip",
  "difficulty": "easy or medium or hard"
}`
            },
            {
                role: 'user',
                content: `Summarize these study notes:\n\n${text.slice(0, 2000)}`
            }
        ],
        max_tokens: 1200,
        temperature: 0.5
    })

    try {
        const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
        return JSON.parse(clean)
    } catch (e) {
        return {
            overview: response.choices[0].message.content,
            keyPoints: [],
            concepts: [],
            studyTip: '',
            difficulty: 'medium'
        }
    }
}

const askQuestion = async (text, question) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are an expert tutor helping a student understand their study material.

When answering:
- Start with a direct clear answer
- Explain the concept in depth with examples
- Use simple language
- Use bullet points where helpful
- End with a real world example
- Be thorough and complete`
            },
            {
                role: 'user',
                content: `Study notes:\n\n${text.slice(0, 2000)}\n\nQuestion: ${question}`
            }
        ],
        max_tokens: 1000,
        temperature: 0.7
    })
    return response.choices[0].message.content
}

const generateQuiz = async (text, count, difficulty) => {
    const difficultyGuide = {
        easy: 'basic recall and definition questions',
        medium: 'application questions requiring concept understanding',
        hard: 'complex analysis requiring critical thinking'
    }

    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            {
                role: 'system',
                content: `You are an expert quiz creator. Generate exactly ${count} ${difficulty} questions.
Difficulty: ${difficultyGuide[difficulty]}

Rules:
- Test real understanding not memorization
- Wrong options must be plausible
- Exactly 4 options per question labeled A B C D
- Include explanation for correct answer
- Return ONLY a JSON array, no markdown

Format:
[
  {
    "question": "Question here?",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A",
    "explanation": "This is correct because..."
  }
]`
            },
            {
                role: 'user',
                content: `Generate ${count} ${difficulty} questions from:\n\n${text.slice(0, 2000)}`
            }
        ],
        max_tokens: 1500,
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
                content: `You are a flashcard generator for academic study.

Rules:
- Front: clear question or concept
- Back: complete accurate answer
- Cover most important concepts
- Generate 10 flashcards
- Return ONLY a JSON array, no markdown

Format:
[
  {
    "front": "What is X?",
    "back": "X is... detailed explanation"
  }
]`
            },
            {
                role: 'user',
                content: `Generate flashcards from:\n\n${text.slice(0, 2000)}`
            }
        ],
        max_tokens: 1000,
        temperature: 0.7
    })
    const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
}

module.exports = { summarizeText, askQuestion, generateQuiz, generateFlashcards }