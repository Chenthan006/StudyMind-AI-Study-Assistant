require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.generateSummary = async (text) => {
  const truncated = text.slice(0, 8000);
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Summarize these study notes in clear bullet points:\n\n${truncated}`
      }
    ]
  });
  return response.choices[0].message.content;
};

exports.chatWithNotes = async (text, message, history) => {
  const truncated = text.slice(0, 6000);
  const messages = [
    {
      role: 'system',
      content: `You are a study assistant. Answer questions based on these notes:\n\n${truncated}`
    },
    ...history,
    { role: 'user', content: message }
  ];
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1000,
    messages
  });
  return response.choices[0].message.content;
};
exports.generateQuiz = async (text) => {
  const truncated = text.slice(0, 8000);
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Generate exactly 5 multiple choice questions from these notes.
Return ONLY a valid JSON array, no other text:
[
  {
    "question": "Question here?",
    "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
    "answer": "A) option1"
  }
]
Notes: ${truncated}`
      }
    ]
  });
  const content = response.choices[0].message.content;
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Invalid quiz format from AI');
  return JSON.parse(jsonMatch[0]);
};