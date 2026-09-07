import axios from 'axios'

const API = 'https://content-service.opa-shan.workers.dev'

const headers = {
  'sec-ch-ua-platform': '"Windows"',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
  'sec-ch-ua': '"Chromium";v="152", "Not?A_Brand";v="24", "Google Chrome";v="152"',
  'content-type': 'application/json',
  'accept': '*/*',
  'origin': 'https://www.y2mate.rest',
  'referer': 'https://www.y2mate.rest/',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function youtubeDownload(url, format = 'mp4') {
  if (!url) throw new Error('URL is required')

  // mp4 → "720", mp3 → "mp3"
  const requestFormat = format === 'mp3' ? 'mp3' : '720'

  const post = await axios.post(
    `${API}/api/v1/downloads`,
    { url, format: requestFormat },
    { headers, validateStatus: () => true, timeout: 30000 }
  )

  const postData = post.data

  // No job_id → immediate result or failure
  if (!postData.job_id) {
    delete postData.status_url
    delete postData.created_at
    delete postData.updated_at
    delete postData.expires_at
    return {
      status: postData.status || 'failed',
      code: post.status,
      input: { url, format },
      result: postData,
    }
  }

  // Poll for result
  const MAX_POLLS = 60 // 2 min max
  for (let i = 0; i < MAX_POLLS; i++) {
    await sleep(2000)
    const get = await axios.get(`${API}/api/v1/downloads/${postData.job_id}`, {
      headers,
      validateStatus: () => true,
      timeout: 30000,
    })
    const result = get.data

    if (['ready', 'failed', 'error'].includes(result.status)) {
      delete result.status_url
      delete result.created_at
      delete result.updated_at
      delete result.expires_at
      return {
        status: result.status,
        code: get.status,
        input: { url, format },
        result,
      }
    }
  }

  return {
    status: 'timeout',
    code: 408,
    input: { url, format },
    result: { message: 'Download timed out after 2 minutes' },
  }
}
