import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function NoteEditor({ onAdd }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleAdd = () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()
    if (!trimmedTitle && !trimmedContent) return

    onAdd({
      id: crypto.randomUUID(),
      title: trimmedTitle || 'Untitled',
      content: trimmedContent,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pinned: false,
    })

    setTitle('')
    setContent('')
  }

  const canAdd = title.trim().length > 0 || content.trim().length > 0

  return (
    <section className="mx-auto mt-6 max-w-5xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-2 w-full bg-transparent text-lg font-semibold outline-none placeholder:text-zinc-400"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={4}
          className="w-full resize-y bg-transparent text-sm leading-6 outline-none placeholder:text-zinc-400"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-zinc-500">Quickly jot down ideas. Your notes are saved locally.</p>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow transition hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Add Note
          </button>
        </div>
      </div>
    </section>
  )
}
