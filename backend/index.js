//Servidor Express
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { analyzeMood } from './mood.js'
import { searchTracks } from './spotify.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/mood', async (req, res) => {
    try {
        const { text } = req.body
        if(!text || text.length < 5 ){
            return res.status(400).json({ error: 'Escreva como você está se sentindo.'})
        }

        //roda o chat e monta a busca
        const mood = await analyzeMood(text)
        const tracks = await searchTracks(mood)
        
        res.json({ mood, tracks })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Algo deu errado. Tente Novamente'})
    }
})

app.listen(process.env.PORT, () =>
    console.log('Servidor rodando na porta ${process.env.PORT}')
)