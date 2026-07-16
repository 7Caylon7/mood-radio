# 🎵 Mood Radio

**Mood Radio** é uma aplicação web que utiliza Inteligência Artificial para analisar o sentimento do usuário a partir de um campo de texto e recomendar músicas personalizadas que combinam com o seu estado emocional.

---

## 🚀 Funcionalidades

- **Análise de Sentimento com IA**  
  Utiliza a API do **Google Gemini** para interpretar o texto fornecido pelo usuário e identificar seu humor atual.

- **Recomendação Musical Inteligente**  
  Com base no sentimento detectado, a aplicação busca músicas relevantes utilizando a **API da Last.fm**.

- **Interface Amigável**  
  Desenvolvida com React e Vite, oferecendo uma experiência fluida e responsiva.

---

## 🧠 Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**
- **Google Gemini API** – para análise de sentimentos
- **Last.fm API** – para busca de músicas
- **Dotenv** – gerenciamento de variáveis de ambiente

### Frontend
- **React** + **Vite**
- **CSS3** – estilização personalizada

---


## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Contas e chaves de API:
  - [Google Gemini](https://ai.google.dev/)
  - [Last.fm](https://www.last.fm/api)

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/mood-radio.git
   cd mood-radio
2. **Configure o backend**
   ```bash
   cd backend
   npm install
3. **Crie um arquivo .env na pasta backend com**
   ```bash
   GEMINI_API_KEY=sua_api_key_gemini
   LASTFM_API_KEY=sua_api_key_lastfm
   LASTFM_API_SECRET=sua_api_secret_lastfm
4. **Configure o frontend**
   ```bash
   cd ../frontend
   npm install
5. **Inicie o servidor backend**
   ```bash
   cd ../backend
   npm start
6. **Inicie o frontend**
   ```bash
   cd ../frontend
   npm run dev
   
## 🧪 Exemplo de Uso

- **Digite como você está se sentindo, por exemplo:**
  "Hoje estou animado e cheio de energia!"
- **A IA analisa o texto e identifica o humor (ex: feliz, energético).**
- **A aplicação retorna uma lista de músicas recomendadas que combinam com esse sentimento.**

