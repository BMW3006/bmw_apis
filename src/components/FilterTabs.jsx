import { categories } from '../data/endpoints'

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
      {categories.map((cat) => {
        const isActive = active === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue/50 ${
              isActive
                ? 'bg-accent-blue text-white'
                : 'border border-border-subtle bg-transparent text-text-muted hover:border-border-hover hover:text-text-primary'
            }`}
          >
            <span className="text-xs">{cat.icon}</span>
            <span>{cat.label}</span>
            {cat.count !== null && (
              <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-text-muted'}`}>
                ({cat.count})
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
