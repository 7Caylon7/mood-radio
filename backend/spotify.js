import axios from "axios";
import 'dotenv/config';
import { cache } from "react";

let cachedToken = null;
let tokenExpiry = 0;

export async function getSpotifyToken() {
    if (cachedToken && Date.now() < tokenExpiry) return cachedToken

    const creds = Buffer.from(
        '`${process.env.SPOTIFY_CLIENT-ID}:${process.env.SPOTIFY_CLIENT_SECRET}`'
    ).toString('base64')

    const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {headers:{Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded'}}
    )

    cachedToken = data.access.token;
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
    return cachedToken
}

export async function searchTracks({genre, energy, keywords}) {
    const token = await getSpotifyToken()
    const query = `${keywords} genre:${genre}`

    const { data } = await axios.get('https://api.spotify.com/v1/search', {
        headers: {Authorization: `Bearer ${token}`},
        params: { q :query, type: 'track', limit: 8, market: 'BR' }
    })

    return data.tracks.items.map(t => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        cover: t.album.images[1]?.url,
        preview: t.preview_url,
        url: t.external_urls.spotify
    }))
}