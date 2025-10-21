import { Search, Moon, Sun } from 'lucide-react'

export default function Header({ search, onSearch, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/60">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow">
            <span className="text-lg font-bold">N</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Noted</h1>
        </div>

        <div className="mx-3 hidden flex-1 items-center rounded-lg border border-zinc-200 bg-white pl-3 ring-0 transition dark:border-zinc-800 dark:bg-zinc-900 sm:flex">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
          />
        </div>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <div className="mx-auto block max-w-5xl px-4 pb-3 sm:hidden">
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </div>
      </div>
    </header>
  )
}
