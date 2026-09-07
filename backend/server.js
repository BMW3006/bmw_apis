import express from 'express'
import cors from 'cors'
import { youtubeDownload } from './scraper/youtube.js'
import { youtubeVipDownload } from './scraper/youtube-vip.js'
import { instagramDownload } from './scraper/instagram.js'
import { tiktokDownload } from './scraper/tiktok.js'
import { downrDownload } from './scraper/downr.js'

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

// Long timeout for scraper endpoints (polling, retries)
app.use((req, res, next) => {
  res.setTimeout(180000)
  next()
})

const wrap = (fn) => async (req, res) => {
  try {
    const result = await fn(req)
    res.json(result)
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      result: { message: err.message },
    })
  }
}

app.get('/api/v1/download/youtube', wrap(async (req) => {
  const { url, format } = req.query
  return youtubeDownload(url, format)
}))

app.get('/api/v1/download/youtube-vip', wrap(async (req) => {
  const { url, type, quality } = req.query
  return youtubeVipDownload(url, type, quality)
}))

app.get('/api/v1/download/instagram', wrap(async (req) => {
  const { url } = req.query
  return instagramDownload(url)
}))

app.get('/api/v1/download/tiktok', wrap(async (req) => {
  const { url } = req.query
  return tiktokDownload(url)
}))

app.get('/api/v1/download/spotify', (req, res) => {
  res.json({
    status: 'error',
    code: 501,
    input: { url: req.query.url },
    result: { message: 'Spotify downloader not yet implemented' },
  })
})

app.get('/api/v1/download/threads', (req, res) => {
  res.json({
    status: 'error',
    code: 501,
    input: { url: req.query.url },
    result: { message: 'Threads downloader not yet implemented' },
  })
})

app.get('/api/v1/download/downr', wrap(async (req) => {
  const { url } = req.query
  return downrDownload(url)
}))

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BMW APIs backend running on port ${PORT}`)
})
