import axios from 'axios'

/**
 * TikTok Downloader
 * Extracts video download URLs directly from the TikTok page HTML.
 * (Original ikdownloader.io domain no longer resolves, so we parse
 *  the TikTok page directly for downloadAddr / playAddr.)
 */

function unescapeUnicode(str) {
  if (!str) return str
  return str.replace(/\\u002F/g, '/').replace(/\\u0026/g, '&')
}

export async function tiktokDownload(url) {
  if (!url) throw new Error('URL is required')

  try {
    const r = await axios.get(url, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
      },
      validateStatus: () => true,
      timeout: 15000,
      maxRedirects: 5,
      responseType: 'text',
      transformResponse: [(v) => v],
    })

    const html = r.data

    const downloadAddr = html.match(/"downloadAddr":"([^"]*)"/)?.[1]
    const playAddr = html.match(/"playAddr":"([^"]*)"/)?.[1]
    const desc = html.match(/"desc":"([^"]*)"/)?.[1]
    const cover = html.match(/"cover":"([^"]*)"/)?.[1]
    const originCover = html.match(/"originCover":"([^"]*)"/)?.[1]
    const uniqueId = html.match(/"uniqueId":"([^"]*)"/)?.[1]
    const nickname = html.match(/"nickname":"([^"]*)"/)?.[1]

    const downloads = []
    if (downloadAddr) {
      downloads.push({ type: 'Video (No Watermark)', url: unescapeUnicode(downloadAddr) })
    }
    if (playAddr) {
      downloads.push({ type: 'Video (Play)', url: unescapeUnicode(playAddr) })
    }

    return {
      status: downloads.length > 0 ? 'success' : 'error',
      code: r.status,
      input: { url },
      result:
        downloads.length > 0
          ? {
              author: uniqueId || nickname || null,
              description: desc || null,
              thumbnail: cover ? unescapeUnicode(cover) : null,
              cover: originCover ? unescapeUnicode(originCover) : null,
              downloads,
            }
          : { message: 'No video found on this TikTok page' },
    }
  } catch (err) {
    return {
      status: 'error',
      code: err.response?.status || 500,
      input: { url },
      result: { message: err.message },
    }
  }
}
