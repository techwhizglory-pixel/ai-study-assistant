const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const summarizeText = async (text) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            { role: 'system', content: 'You are a study assistant. Return JSON only with keys: overview (string) and keyPoints (array of strings). No markdown, just raw JSON.' },
            { role: 'user', content: `Summarize these notes: ${text}` }
        ]
    })
    const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
}

const askQuestion = async (text, question) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            { role: 'system', content: 'Answer questions based only on the provided notes.' },
            { role: 'user', content: `Notes: ${text}\n\nQuestion: ${question}` }
        ]
    })
    return response.choices[0].message.content
}

const generateQuiz = async (text, count, difficulty) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
            { 
                role: 'system', 
                content: `You are a quiz generator. Return JSON only — no markdown, no explanation. 
Return an array of exactly ${count} questions in this format:
[
  {
    "question": "question here",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A"
  }
]`
            },
            { 
                role: 'user', 
                content: `Generate ${count} ${difficulty} difficulty multiple choice questions from these notes: ${text}` 
            }
        ]
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
                content: `You are a flashcard generator. Create clear study flashcards from the notes.
Return JSON array only, no markdown:
[
  {
    "front": "Question or concept here",
    "back": "Answer or explanation here"
  }
]
Generate between 8-12 flashcards covering the most important concepts.`
            },
            {
                role: 'user',
                content: `Generate flashcards from these notes: ${text}`
            }
        ],
        max_tokens: 2000
    })
    const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
}

module.exports = { summarizeText, askQuestion, generateQuiz, generateFlashcards }