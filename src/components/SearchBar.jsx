export default function SearchBar({ value, onChange }) {
  return (
    <div className="px-4 pb-4">
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search endpoints..."
          className="w-full rounded-xl border border-border-subtle bg-bg-input py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-accent-blue/40"
        />
      </div>
    </div>
  )
}
