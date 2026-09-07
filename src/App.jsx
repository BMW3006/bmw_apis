import { useMemo, useState } from 'react'
import Header from './components/Header'
import SubHeader from './components/SubHeader'
import Hero from './components/Hero'
import FilterTabs from './components/FilterTabs'
import SearchBar from './components/SearchBar'
import EndpointCard from './components/EndpointCard'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'
import { endpoints } from './data/endpoints'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('light', next === 'light')
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = useMemo(() => {
    return endpoints.filter((ep) => {
      const matchCategory = activeCategory === 'all' || ep.category === activeCategory
      const matchSearch =
        !search ||
        ep.name.toLowerCase().includes(search.toLowerCase()) ||
        ep.path.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div className="grid-bg min-h-screen pb-24 lg:pb-8">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <SubHeader />

      <main className="mx-auto max-w-3xl px-0">
        <Hero />
        <FilterTabs active={activeCategory} onChange={setActiveCategory} />
        <SearchBar value={search} onChange={setSearch} />

        {/* Endpoint list */}
        <div className="space-y-3 px-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-text-muted">
              No endpoints found.
            </div>
          ) : (
            filtered.map((ep) => (
              <EndpointCard key={ep.id} endpoint={ep} onToast={showToast} />
            ))
          )}
        </div>
      </main>

      <BottomNav />
      <Toast toast={toast} />
    </div>
  )
}
