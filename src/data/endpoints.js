export const endpoints = [
  {
    id: 'instagram',
    method: 'GET',
    name: 'Instagram Downloader',
    path: '/api/v1/download/instagram',
    category: 'downloader',
    description: 'Download photos, reels & stories from Instagram',
    params: [
      { name: 'url', type: 'text', label: 'Instagram URL', placeholder: 'https://www.instagram.com/p/...' },
    ],
    options: [],
  },
  {
    id: 'tiktok',
    method: 'GET',
    name: 'TikTok Downloader',
    path: '/api/v1/download/tiktok',
    category: 'downloader',
    description: 'Download TikTok videos without watermark',
    params: [
      { name: 'url', type: 'text', label: 'TikTok URL', placeholder: 'https://www.tiktok.com/@user/video/...' },
    ],
    options: [],
  },
  {
    id: 'youtube',
    method: 'GET',
    name: 'YouTube Downloader',
    path: '/api/v1/download/youtube',
    category: 'downloader',
    description: 'Download YouTube videos via content-service worker',
    params: [
      { name: 'url', type: 'text', label: 'YouTube URL', placeholder: 'https://youtube.com/watch?v=...' },
    ],
    options: [
      { name: 'format', label: 'Format', choices: ['mp4', 'mp3'] },
    ],
  },
  {
    id: 'youtube-vip',
    method: 'GET',
    name: 'YouTube VIP Downloader',
    path: '/api/v1/download/youtube-vip',
    category: 'downloader',
    description: 'Premium YouTube downloader via SaveTube — higher quality, no limits',
    params: [
      { name: 'url', type: 'text', label: 'YouTube URL', placeholder: 'https://youtube.com/watch?v=...' },
    ],
    options: [
      { name: 'type', label: 'Type', choices: ['audio', 'video'] },
      { name: 'quality', label: 'Quality', choices: ['320', '256', '128', '64'] },
    ],
  },
  {
    id: 'spotify',
    method: 'GET',
    name: 'Spotify Downloader',
    path: '/api/v1/download/spotify',
    category: 'downloader',
    description: 'Download tracks & playlists from Spotify',
    params: [
      { name: 'url', type: 'text', label: 'Spotify URL', placeholder: 'https://open.spotify.com/track/...' },
    ],
    options: [],
  },
  {
    id: 'threads',
    method: 'GET',
    name: 'Threads Downloader',
    path: '/api/v1/download/threads',
    category: 'downloader',
    description: 'Download media from Threads posts',
    params: [
      { name: 'url', type: 'text', label: 'Threads URL', placeholder: 'https://threads.net/@user/post/...' },
    ],
    options: [],
  },
  {
    id: 'downr',
    method: 'GET',
    name: 'Universal Media Downloader (Downr)',
    path: '/api/v1/download/downr',
    category: 'downloader',
    description: 'Universal downloader supporting 1000+ sites',
    params: [
      { name: 'url', type: 'text', label: 'Any Media URL', placeholder: 'https://...' },
    ],
    options: [],
  },
]

export const categories = [
  { id: 'all', label: 'Semua', icon: '◉', count: null },
  { id: 'downloader', label: 'Downloader', icon: '⬇', count: 7 },
  { id: 'apikey', label: 'API Key & Watumiaji', icon: '🔑', count: 0 },
]
