export default function SubHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      {/* Back / Re-boot */}
      <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-blue/40 rounded">
        <span className="text-sm">←</span>
        <span>BACK</span>
        <span className="text-border-hover">//</span>
        <span>RE-BOOT</span>
      </button>

      {/* API Key display */}
      <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-card px-3 py-1.5">
        <span className="text-xs text-text-muted">🔑</span>
        <span className="text-xs font-medium text-text-muted">KEY:</span>
        <span className="text-xs font-medium text-text-primary">bmw_pro_47f8…</span>
        <span className="rounded-full bg-accent-blue/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-cyan">
          PRO
        </span>
      </div>
    </div>
  )
}
