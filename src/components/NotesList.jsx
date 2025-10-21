import { useState } from 'react'
import { Pin, Trash2, Edit, Check, X, Clock } from 'lucide-react'

export default function NotesList({ notes, onUpdate, onDelete, onTogglePin }) {
  if (!notes.length) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-800">
        No notes yet. Create one above!
      </div>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />)
      )}
    </div>
  )
}

function formatDate(ts) {
  const d = new Date(ts)
  return d.toLocaleString()
}

function NoteCard({ note, onUpdate, onDelete, onTogglePin }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const save = () => {
    const t = title.trim() || 'Untitled'
    onUpdate(note.id, { title: t, content: content.trim() })
    setIsEditing(false)
  }

  const cancel = () => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }

  return (
    <div className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="absolute right-2 top-2 flex items-center gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
        <button
          onClick={() => onTogglePin(note.id)}
          className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs transition ${
            note.pinned
              ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300'
              : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
          }`}
          title={note.pinned ? 'Unpin' : 'Pin'}
        >
          <Pin className="h-4 w-4" />
        </button>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <Edit className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex gap-1">
            <button
              onClick={save}
              className="inline-flex items-center justify-center rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={cancel}
              className="inline-flex items-center justify-center rounded-md border border-rose-300 bg-rose-50 px-2 py-1 text-xs text-rose-800 transition hover:bg-rose-100 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <button
          onClick={() => onDelete(note.id)}
          className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {!isEditing ? (
        <div className="pr-16">
          <h3 className="mb-1 line-clamp-2 text-lg font-semibold">{note.title}</h3>
          <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {note.content}
          </p>
        </div>
      ) : (
        <div className="pr-16">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-base font-semibold outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-800"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full resize-y rounded-md border border-zinc-200 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-800"
          />
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
        <Clock className="h-3.5 w-3.5" />
        <span>Updated {formatDate(note.updatedAt)}</span>
      </div>
    </div>
  )
}
