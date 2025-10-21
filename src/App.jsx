import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import NoteEditor from './components/NoteEditor'
import FiltersBar from './components/FiltersBar'
import NotesList from './components/NotesList'

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem('notes')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [search, setSearch] = useState('')
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('updated') // 'updated' | 'title'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const addNote = (note) => {
    setNotes((prev) => [{ ...note }, ...prev])
  }

  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n))
    )
  }

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const togglePin = (id) => {
    setNotes((prev) =>
      prev
        .map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n))
    )
  }

  const filteredSortedNotes = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = [...notes]

    if (q) {
      list = list.filter((n) =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      )
    }

    if (showPinnedOnly) {
      list = list.filter((n) => n.pinned)
    }

    list.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      // default: updated
      return b.updatedAt - a.updatedAt
    })

    // Keep pinned on top when not filtering pinned only
    if (!showPinnedOnly) {
      list.sort((a, b) => Number(b.pinned) - Number(a.pinned))
    }

    return list
  }, [notes, search, showPinnedOnly, sortBy])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Header
        search={search}
        onSearch={setSearch}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <NoteEditor onAdd={addNote} />

        <FiltersBar
          showPinnedOnly={showPinnedOnly}
          onTogglePinnedOnly={() => setShowPinnedOnly((p) => !p)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredSortedNotes.length}
        />

        <NotesList
          notes={filteredSortedNotes}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onTogglePin={togglePin}
        />
      </main>
    </div>
  )
}

export default App
