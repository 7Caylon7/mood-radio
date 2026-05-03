import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config'

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function analyzeMood(text) {
  const model = genai.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `Você é um DJ especialista em música. Analise o texto e retorne APENAS um JSON com:
- genre: gênero musical ideal (ex: "lo-fi", "samba", "jazz", "pop", "bossa nova")
- energy: "baixa", "média" ou "alta"
- keywords: 2-3 palavras-chave em inglês para busca no Spotify (ex: "relaxing night rain")
- mood_label: frase curta e poética descrevendo o humor (em português)

Texto: "${text}"

Responda APENAS com o JSON puro, sem markdown, sem explicação.`

  const result = await model.generateContent(prompt)
  const raw = result.response.text().replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}