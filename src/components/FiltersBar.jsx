import { Pin, ArrowUpDown } from 'lucide-react'

export default function FiltersBar({ showPinnedOnly, onTogglePinnedOnly, sortBy, onSortChange, totalCount }) {
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">{totalCount}</span>
        <span>notes</span>
      </div>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        <button
          onClick={onTogglePinnedOnly}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition active:scale-95 ${
            showPinnedOnly
              ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300'
              : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
          }`}
        >
          <Pin className="h-4 w-4" /> {showPinnedOnly ? 'Pinned only' : 'Show pinned'}
        </button>

        <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <ArrowUpDown className="h-4 w-4 text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="updated">Recently updated</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}
