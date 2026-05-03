import axios from 'axios'
import 'dotenv/config'

export async function searchTracks({ genre, energy, keywords }) {
  const query = `${keywords} ${genre}`

  const { data } = await axios.get('https://ws.audioscrobbler.com/2.0/', {
    params: {
      method: 'track.search',
      track: query,
      api_key: process.env.LASTFM_API_KEY,
      format: 'json',
      limit: 8
    }
  })

  const tracks = data.results?.trackmatches?.track ?? []

  return tracks.map(t => ({
    id: t.mbid || t.name,
    name: t.name,
    artist: t.artist,
    album: '',
    cover: t.image?.find(i => i.size === 'large')?.['#text'] || null,
    preview: null,
    url: t.url
  }))
}