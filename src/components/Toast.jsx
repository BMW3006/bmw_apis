export default function Toast({ toast }) {
  if (!toast) return null

  const isError = toast.type === 'error'
  return (
    <div className="fixed bottom-20 right-4 z-[100] lg:bottom-6">
      <div
        className={`toast-in flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-lg ${
          isError
            ? 'border-red-500/30 bg-red-500/10 text-red-400'
            : 'border-status-green/30 bg-status-green/10 text-status-green'
        }`}
      >
        <span>{isError ? '✕' : '✓'}</span>
        <span>{toast.message}</span>
      </div>
    </div>
  )
}
