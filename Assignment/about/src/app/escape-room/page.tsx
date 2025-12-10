'use client'

import { useEffect, useMemo, useState } from 'react'

type GameMode = 'court' | 'escape'

type Option = {
  id: number
  text: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const courtRoomOptions: Option[] = [
  { id: 1, text: 'Present new evidence 🔍', difficulty: 'medium' },
  { id: 2, text: 'Cross-examine a witness 🧑‍⚖️', difficulty: 'hard' },
  { id: 3, text: 'Request a short recess ☕', difficulty: 'easy' },
  { id: 4, text: 'Object to a question ❗', difficulty: 'medium' },
  { id: 5, text: 'Negotiate a plea deal 🤝', difficulty: 'hard' },
]

const escapeRoomOptions: Option[] = [
  { id: 6, text: 'Search under the desk 🔎', difficulty: 'easy' },
  { id: 7, text: 'Inspect the locked box 🔐', difficulty: 'medium' },
  { id: 8, text: 'Decode the wall symbols 🧩', difficulty: 'hard' },
  { id: 9, text: 'Check behind the painting 🖼️', difficulty: 'easy' },
  { id: 10, text: 'Listen for hidden sounds 🎧', difficulty: 'medium' },
]

export default function EscapeRoomPage() {
  const [mode, setMode] = useState<GameMode>('escape')

  // Timer state
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  // Generated options
  const [generatedOptions, setGeneratedOptions] = useState<Option[]>([])
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)

  // For display only (no hydration issue)
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  // Timer effect
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const formattedTime = useMemo(() => {
    const m = Math.floor(secondsLeft / 60)
    const s = secondsLeft % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }, [secondsLeft])

  const resetTimer = () => {
    setSecondsLeft(60)
    setIsRunning(false)
  }

  const optionsForMode = mode === 'court' ? courtRoomOptions : escapeRoomOptions

  const generateOptions = () => {
    // pick up to 3 random unique options
    const shuffled = [...optionsForMode].sort(() => Math.random() - 0.5)
    setGeneratedOptions(shuffled.slice(0, 3))
    setSelectedOptionId(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 flex items-center justify-center px-4 py-10 text-gray-100">
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 w-full max-w-3xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Court Room ⚖️ or Escape Room 🔐
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Choose a mode, start the timer, generate multiple options, and pick
            your best move.
          </p>
        </header>

        {/* Mode Switch */}
        <section aria-label="Game mode selection" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-2 bg-slate-800/70 rounded-full p-1">
            <button
              type="button"
              onClick={() => setMode('court')}
              className={`flex-1 rounded-full px-3 py-2 text-sm sm:text-base font-medium transition ${
                mode === 'court'
                  ? 'bg-amber-400 text-slate-900 shadow'
                  : 'text-slate-300 hover:bg-slate-700/80'
              }`}
            >
              ⚖️ Court Room
            </button>
            <button
              type="button"
              onClick={() => setMode('escape')}
              className={`flex-1 rounded-full px-3 py-2 text-sm sm:text-base font-medium transition ${
                mode === 'escape'
                  ? 'bg-emerald-400 text-slate-900 shadow'
                  : 'text-slate-300 hover:bg-slate-700/80'
              }`}
            >
              🔐 Escape Room
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 text-center sm:text-right">
            Current mode:{' '}
            <span className="font-semibold">
              {mode === 'court' ? 'Court Room' : 'Escape Room'}
            </span>
          </p>
        </section>

        {/* Timer */}
        <section
          aria-label="Game timer"
          className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center rounded-2xl border border-slate-600 px-4 py-3">
              <span className="text-xs uppercase tracking-wide text-slate-300">
                Time Left
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold ml-3">
                {formattedTime}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-400 text-slate-900 hover:bg-emerald-300 transition"
            >
              {isRunning ? 'Pause ⏸️' : 'Start ▶️'}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-700 text-slate-100 hover:bg-slate-600 transition"
            >
              Reset 🔄
            </button>
          </div>
        </section>

        {/* Options + Gameplay */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">
              {mode === 'court'
                ? 'Choose your legal strategy'
                : 'Find a way to escape'}
            </h2>
            <button
              type="button"
              onClick={generateOptions}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white transition"
            >
              🎲 Generate Options
            </button>
          </div>

          {generatedOptions.length === 0 ? (
            <p className="text-sm text-slate-300">
              Click <strong>“Generate Options”</strong> to see multiple possible
              actions for this mode.
            </p>
          ) : (
            <ul className="grid sm:grid-cols-3 gap-3">
              {generatedOptions.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`w-full h-full text-left rounded-2xl border px-3 py-3 text-sm transition ${
                      selectedOptionId === opt.id
                        ? 'border-emerald-400 bg-emerald-400/10 shadow'
                        : 'border-slate-700 bg-slate-800/70 hover:bg-slate-700/80'
                    }`}
                  >
                    <p className="font-medium">{opt.text}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-300">
                      Difficulty:{' '}
                      <span className="font-semibold">
                        {opt.difficulty}
                      </span>
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {selectedOptionId && (
            <div className="mt-2 text-sm text-emerald-300">
              ✅ Selected option:{' '}
              {
                generatedOptions.find((o) => o.id === selectedOptionId)
                  ?.text
              }
            </div>
          )}
        </section>

        {/* Icons / Buttons note */}
        <section className="text-xs text-slate-400 border-t border-slate-700 pt-3">
          <p>
            💡 Icons are currently emojis for simplicity. You can replace them
            with SVGs exported from PowerPoint and placed in{' '}
            <code className="bg-slate-800 px-1 rounded">/public/icons</code>.
          </p>
        </section>

        <footer className="pt-2 text-center text-xs text-slate-500">
          © {currentYear} Christoffer Raffaelo Wijaya — Court Room &amp; Escape
          Room Game.
        </footer>
      </div>
    </main>
  )
}
