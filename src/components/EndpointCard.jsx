import { useState } from 'react'

const methodStyles = {
  GET: 'bg-accent-blue/15 text-accent-cyan border-accent-blue/30',
  POST: 'bg-status-green/15 text-status-green border-status-green/30',
}

export default function EndpointCard({ endpoint, onToast }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [paramValues, setParamValues] = useState({})
  const [optionValues, setOptionValues] = useState({})
  const [copied, setCopied] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    setResponse(null)
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const query = new URLSearchParams()
      endpoint.params.forEach((p) => {
        if (paramValues[p.name]) query.set(p.name, paramValues[p.name])
      })
      endpoint.options.forEach((o) => {
        if (optionValues[o.name]) query.set(o.name, optionValues[o.name])
      })
      const url = `${baseUrl}${endpoint.path}?${query.toString()}`
      const res = await fetch(url)
      const data = await res.json().catch(() => ({ status: res.status, ok: res.ok }))
      setResponse(JSON.stringify(data, null, 2))
      onToast('Request complete', 'success')
    } catch (err) {
      setResponse(JSON.stringify({ error: err.message }, null, 2))
      onToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const copyResponse = () => {
    if (!response) return
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={`rounded-xl border bg-bg-card transition-colors ${
        open ? 'border-border-hover' : 'border-border-subtle hover:border-border-hover'
      }`}
    >
      {/* Card header — clickable */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left focus:outline-none focus:ring-1 focus:ring-accent-blue/40 rounded-xl"
      >
        {/* Method badge */}
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide ${
            methodStyles[endpoint.method] || methodStyles.GET
          }`}
        >
          {endpoint.method}
        </span>

        {/* Title + path */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-text-primary">{endpoint.name}</p>
          <p className="truncate text-xs text-text-muted">{endpoint.path}</p>
        </div>

        {/* Chevron */}
        <span className={`chevron shrink-0 text-text-muted ${open ? 'open' : ''}`}>⌄</span>
      </button>

      {/* Expandable content */}
      <div className={`expand-content ${open ? 'open' : ''}`}>
        <div className="expand-inner">
          <div className="space-y-4 px-4 pb-4 pt-1">
            {/* Description */}
            <p className="text-xs text-text-muted">{endpoint.description}</p>

            {/* Param inputs */}
            {endpoint.params.map((p) => (
              <div key={p.name}>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  {p.label}
                </label>
                <input
                  type={p.type}
                  value={paramValues[p.name] || ''}
                  onChange={(e) =>
                    setParamValues({ ...paramValues, [p.name]: e.target.value })
                  }
                  placeholder={p.placeholder}
                  className="w-full rounded-lg border border-border-subtle bg-bg-input px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/60 transition-colors focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-accent-blue/40"
                />
              </div>
            ))}

            {/* Option dropdowns */}
            {endpoint.options.map((o) => (
              <div key={o.name}>
                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                  {o.label}
                </label>
                <select
                  value={optionValues[o.name] || ''}
                  onChange={(e) =>
                    setOptionValues({ ...optionValues, [o.name]: e.target.value })
                  }
                  className="w-full rounded-lg border border-border-subtle bg-bg-input px-3 py-2 text-sm text-text-primary transition-colors focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-accent-blue/40"
                >
                  <option value="" className="bg-bg-card">Select {o.label}…</option>
                  {o.choices.map((c) => (
                    <option key={c} value={c} className="bg-bg-card">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Test button */}
            <button
              onClick={handleTest}
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50"
            >
              {loading ? '⏳ Running…' : '▶ Test / Run'}
            </button>

            {/* Response */}
            {loading && (
              <div className="space-y-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
              </div>
            )}
            {response && !loading && (
              <div className="rounded-lg border border-border-subtle bg-bg-input">
                <div className="flex items-center justify-between border-b border-border-subtle px-3 py-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Response
                  </span>
                  <button
                    onClick={copyResponse}
                    className="text-[10px] font-medium text-accent-cyan transition-colors hover:text-accent-blue focus:outline-none"
                  >
                    {copied ? '✓ Copied!' : '⧉ Copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto px-3 py-2.5 text-xs leading-relaxed text-text-primary/90">
                  <code>{response}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
