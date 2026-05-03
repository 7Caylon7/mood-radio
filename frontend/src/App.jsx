import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001'

export default function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [playing, setPlaying] = useState(null)

  async function handleSubmit() {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { data } = await axios.post(`${API}/mood`, { text })
      setResult(data)
    } catch {
      setError('Não conseguimos montar sua playlist. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function togglePlay(track) {
    if (!track.preview) return
    if (playing?.id === track.id) {
      playing.audio.pause()
      setPlaying(null)
    } else {
      playing?.audio.pause()
      const audio = new Audio(track.preview)
      audio.play()
      audio.onended = () => setPlaying(null)
      setPlaying({ id: track.id, audio })
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Mood Radio</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Como você está se sentindo agora?
      </p>

      <textarea
        rows={4}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ex: estou cansado mas com aquela sensação boa de missão cumprida..."
        style={{ width: '100%', padding: 12, fontSize: 15, borderRadius: 8,
                 border: '1px solid #ddd', resize: 'vertical', boxSizing: 'border-box' }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        style={{ marginTop: 12, padding: '10px 24px', fontSize: 14, fontWeight: 500,
                 background: loading ? '#ccc' : '#1DB954', color: '#fff',
                 border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer' }}
      >
        {loading ? 'Montando sua playlist...' : 'Criar playlist'}
      </button>

      {error && <p style={{ color: '#e53e3e', marginTop: 16 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 32 }}>
          <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: '#888', margin: '0 0 4px' }}>seu humor</p>
            <p style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px' }}>{result.mood.mood_label}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={badge('#e8f5e9', '#2e7d32')}>{result.mood.genre}</span>
              <span style={badge('#e3f2fd', '#1565c0')}>energia {result.mood.energy}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {result.tracks.map(track => (
              <div key={track.id}
                style={{ display: 'flex', alignItems: 'center', gap: 12,
                         padding: '10px 14px', border: '1px solid #eee',
                         borderRadius: 10, background: playing?.id === track.id ? '#f0fff4' : '#fff' }}>
                {track.cover && (
                  <img src={track.cover} alt="" width={48} height={48}
                    style={{ borderRadius: 6, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: 14,
                               whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{track.artist}</p>
                </div>
                {track.preview && (
                  <button onClick={() => togglePlay(track)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer',
                             fontSize: 20, color: '#1DB954', padding: 4 }}>
                    {playing?.id === track.id ? '⏸' : '▶'}
                  </button>
                )}
                <a href={track.url} target="_blank" rel="noreferrer"
                  style={{ fontSize: 11, color: '#1DB954', textDecoration: 'none' }}>
                  Abrir
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function badge(bg, color) {
  return { background: bg, color, fontSize: 12, padding: '3px 10px',
           borderRadius: 20, fontWeight: 500, display: 'inline-block' }
}