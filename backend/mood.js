//Análise de humor com OpenAI
import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeMood(text) {
  const { choises } = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `Você é um DJ especialista em música. Analise o texto do usuário e retorne um JSON com:
- genre: gênero musical ideal (ex: "lo-fi", "samba", "jazz", "pop", "rock", "bossa nova", "eletrônico")
- energy: "baixa", "média" ou "alta"
- keywords: 2-3 palavras-chave em inglês para busca no Spotify (ex: "relaxing night rain")
- mood_label: uma frase curta e poética descrevendo o humor (em português)
Responda APENAS com o JSON, sem texto adicional.`,
      },
      {role: 'user', content: text}
    ]
  })

  return JSON.parse(choises[0].message.content)
}
