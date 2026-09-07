import { useEffect, useState } from 'react'

export default function Header({ theme, onToggleTheme }) {
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setUptime((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0')
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return `${h}:${m}:${sec}`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-base/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="flex items-center gap-1 text-lg font-extrabold tracking-tight">
          <span className="text-text-primary">BMW</span>
          <span className="text-accent-cyan">APIs</span>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1.5">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-status-green" />
          <span className="text-xs font-medium text-text-muted">{formatTime(uptime)}</span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-muted transition-colors hover:border-border-hover hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-muted transition-colors hover:border-border-hover hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
            aria-label="Menu"
          >
            <span className="flex flex-col gap-[3px]">
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
