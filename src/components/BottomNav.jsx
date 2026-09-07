export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-subtle bg-bg-base/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around px-4 py-2.5">
        <button className="flex flex-col items-center gap-0.5 text-text-muted">
          <span className="text-lg">←</span>
          <span className="text-[10px]">Back</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-text-muted">
          <span className="text-lg">💬</span>
          <span className="text-[10px]">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2 text-white">
          <span className="text-xs font-bold">Preview</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-text-muted">
          <span className="flex flex-col gap-[2px]">
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
          </span>
          <span className="text-[10px]">Menu</span>
        </button>
      </div>
    </nav>
  )
}
