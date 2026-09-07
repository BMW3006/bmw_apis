import axios from 'axios'
import crypto from 'crypto'

// Extracted from the obfuscated savetube scraper
const SECRET_KEY_HEX = 'C5D58EF67A7584E4A29F6C35BBC4EB12'

function decryptData(encryptedBase64) {
  const key = Buffer.from(SECRET_KEY_HEX, 'hex')
  const encryptedBuffer = Buffer.from(encryptedBase64.replace(/\s/g, ''), 'base64')
  const iv = encryptedBuffer.subarray(0, 16)
  const ciphertext = encryptedBuffer.subarray(16)
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  let decrypted = decipher.update(ciphertext, null, 'utf8')
  decrypted += decipher.final('utf8')
  return JSON.parse(decrypted)
}

const headers = {
  host: 'cdn403.savetube.vip',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:153.0) Gecko/20100101 Firefox/153.0',
  accept: 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9',
  'content-type': 'application/json',
  origin: 'https://y2mate.net.co',
  referer: 'https://y2mate.net.co/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
}

export async function youtubeVipDownload(url, downloadType = 'audio', quality = '128') {
  if (!url) throw new Error('URL is required')

  try {
    // Step 1: get video info
    const infoRes = await axios.post(
      'https://cdn403.savetube.vip/v2/info',
      { url },
      { headers, validateStatus: () => true, timeout: 30000 }
    )

    if (!infoRes.data?.data) {
      return {
        status: 'error',
        code: 400,
        input: { url, type: downloadType, quality },
        result: { message: 'Failed to get data from /v2/info' },
      }
    }

    // Step 2: decrypt the response to extract the key
    const decrypted = decryptData(infoRes.data.data)
    const extractedKey = decrypted?.key

    if (!extractedKey) {
      return {
        status: 'error',
        code: 400,
        input: { url, type: downloadType, quality },
        result: { message: 'Failed to extract key from decrypted data' },
      }
    }

    // Step 3: request the download
    const downloadRes = await axios.post(
      'https://cdn403.savetube.vip/download',
      { downloadType, quality, key: extractedKey },
      {
        headers: { ...headers, accept: '*/*', priority: 'u=4' },
        validateStatus: () => true,
        timeout: 30000,
      }
    )

    return {
      status: downloadRes.data?.status ?? 'success',
      code: Number(downloadRes.data?.message) || 200,
      input: { url, type: downloadType, quality },
      result: {
        title: decrypted.title,
        duration: decrypted.durationLabel,
        downloadUrl: downloadRes.data?.data?.downloadUrl,
        downloaded: downloadRes.data?.data?.downloaded,
      },
    }
  } catch (err) {
    return {
      status: 'error',
      code: err.response?.status || 500,
      input: { url, type: downloadType, quality },
      result: { message: err.message },
    }
  }
}
