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

module.exports = { summarizeText, askQuestion }