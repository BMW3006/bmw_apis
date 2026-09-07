/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-card': 'var(--bg-card)',
        'bg-input': 'var(--bg-input)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'border-subtle': 'var(--border-color)',
        'border-hover': 'var(--border-hover)',
        'accent-blue': '#3b82f6',
        'accent-cyan': '#06b6d4',
        'status-green': '#10b981',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Space Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
