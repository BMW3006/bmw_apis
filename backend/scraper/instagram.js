import axios from 'axios'

/**
 * Instagram Downloader
 * Extracts media URLs directly from the Instagram post page HTML.
 * (Original sssinstagram.com scraper requires browser tokens that can't
 *  be replicated server-side, so we parse the page directly.)
 */
export async function instagramDownload(url) {
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

    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)?.[1]
    const ogVideo = html.match(/<meta\s+property="og:video"\s+content="([^"]*)"/i)?.[1]
    const ogVideoSecure = html.match(
      /<meta\s+property="og:video:secure_url"\s+content="([^"]*)"/i
    )?.[1]
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1]
    const ogDescription = html.match(
      /<meta\s+property="og:description"\s+content="([^"]*)"/i
    )?.[1]

    const medias = []
    if (ogVideo || ogVideoSecure) {
      medias.push({ type: 'video', download_url: ogVideoSecure || ogVideo })
    }
    if (ogImage) {
      medias.push({ type: 'image', download_url: ogImage })
    }

    return {
      status: medias.length > 0 ? 'success' : 'error',
      code: r.status,
      input: { url },
      result:
        medias.length > 0
          ? { title: ogTitle, description: ogDescription, medias }
          : { message: 'No media found on this Instagram page' },
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
