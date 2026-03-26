import { useState, useEffect, useRef } from 'react'
import { SemanticEngine } from './SemanticEngine'
import { generateReply } from './localResumeAssistant'
import { recordMessage } from './SessionMemory'

type Msg = { role: 'user' | 'assistant'; text: string }
type ChatWindowProps = { onClose?: () => void; avatarSrc?: string }

type ModelStatus = 'loading' | 'ready' | 'error'

const SUGGESTIONS = [
  'What does Amram do at KPMG?',
  'Tell me about his AI/LLM skills',
  'What projects has he built?',
  'How can I contact him?',
]

/** Format assistant text: convert bullet markers and line breaks into React nodes */
function MessageText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return null
        if (line.startsWith('•')) {
          return (
            <p key={i} className="flex gap-1.5 text-sm leading-relaxed">
              <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
              <span>{line.slice(1).trim()}</span>
            </p>
          )
        }
        // Auto-link URLs
        const urlRe = /(https?:\/\/[^\s]+)/g
        const parts = line.split(urlRe)
        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((part, j) =>
              urlRe.test(part) ? (
                <a key={j} href={part} target="_blank" rel="noreferrer"
                  className="underline text-cyan-300 hover:text-cyan-100">
                  {part.replace(/^https?:\/\//, '')}
                </a>
              ) : part
            )}
          </p>
        )
      })}
    </div>
  )
}

export default function ChatWindow({ onClose, avatarSrc }: ChatWindowProps) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: 'Hello! I\'m ORBITA, Amram\'s AI assistant. I can answer questions about his experience, projects, AI work, skills, and more. What would you like to know?' }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [modelStatus, setModelStatus] = useState<ModelStatus>('loading')
  const [modelMsg, setModelMsg] = useState('Initializing AI engine…')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  // ── Initialize semantic model on mount ─────────────────────────────────────
  useEffect(() => {
    if (SemanticEngine.ready) { setModelStatus('ready'); return }
    SemanticEngine.initialize((msg) => {
      if (msg === 'ready') {
        setModelStatus('ready')
      } else if (msg === 'error') {
        setModelStatus('error')
        setModelMsg('Using keyword search mode.')
      } else {
        setModelStatus('loading')
        setModelMsg(msg)
      }
    })
  }, [])

  // ── Auto scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  // ── Send message ───────────────────────────────────────────────────────────
  async function handleSend(text?: string) {
    const q = (text ?? input).trim()
    if (!q || thinking) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setThinking(true)

    // Small delay so the UI updates before we start processing
    await new Promise(r => setTimeout(r, 200))

    recordMessage('user', q)
    const reply = await generateReply(q, messages)
    recordMessage('assistant', reply)
    setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    setThinking(false)
    inputRef.current?.focus()
  }

  return (
    <div className="fixed bottom-6 right-6 w-[370px] max-h-[580px] bg-slate-950 border border-cyan-500/60 shadow-[0_0_32px_rgba(34,211,238,.3)] rounded-2xl flex flex-col overflow-hidden z-50">

      {/* ── Header ── */}
      <div className="px-4 py-3 border-b border-cyan-500/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          {avatarSrc && (
            <img src={avatarSrc} alt="ORBITA" className="w-8 h-8 rounded-lg object-contain" />
          )}
          <div>
            <p className="text-cyan-300 font-bold text-sm tracking-wide leading-tight">ORBITA</p>
            <p className="text-cyan-600 text-[10px] leading-tight">AI Portfolio Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Model status dot */}
          <span className={`w-2 h-2 rounded-full shrink-0 ${
            modelStatus === 'ready'   ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,.8)]' :
            modelStatus === 'error'   ? 'bg-amber-400' :
            'bg-cyan-400 animate-pulse'
          }`} title={modelStatus === 'ready' ? 'Semantic AI ready' : modelMsg} />
          <button onClick={onClose}
            className="text-xs text-cyan-500 border border-cyan-700 rounded-lg px-2.5 py-1 hover:bg-cyan-950 hover:text-cyan-300 transition">
            ✕
          </button>
        </div>
      </div>

      {/* ── Model loading banner ── */}
      {modelStatus === 'loading' && (
        <div className="px-4 py-2 bg-cyan-950/50 border-b border-cyan-800/40 flex items-center gap-2 shrink-0">
          <div className="flex gap-0.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <p className="text-[11px] text-cyan-400">{modelMsg}</p>
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] px-3 py-2.5 rounded-xl ${
              m.role === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-100 border border-cyan-900/60'
            }`}>
              {m.role === 'assistant' ? <MessageText text={m.text} /> : (
                <p className="text-sm leading-relaxed">{m.text}</p>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {thinking && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-cyan-900/60 rounded-xl px-3 py-2.5 flex gap-1 items-center">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Suggestion chips — show only at start */}
        {messages.length === 1 && !thinking && (
          <div className="pt-1 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => handleSend(s)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-cyan-700/60 text-cyan-400 hover:bg-cyan-900/40 hover:border-cyan-500 transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="p-3 border-t border-cyan-500/40 shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="Ask about experience, skills, projects…"
            disabled={thinking}
            className="flex-1 bg-slate-900 border border-cyan-700/50 rounded-xl px-3 py-2 text-sm text-cyan-100 placeholder-cyan-700 outline-none focus:border-cyan-400 transition disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || thinking}
            className="px-3 py-2 rounded-xl border border-cyan-500/60 text-cyan-300 hover:bg-cyan-900/50 transition disabled:opacity-30 disabled:cursor-not-allowed text-base"
          >
            ➤
          </button>
        </div>
        <p className="text-[10px] text-cyan-800 mt-1.5 text-center">
          {modelStatus === 'ready' ? '✦ Semantic AI active' : modelStatus === 'error' ? '⚡ Keyword mode' : '⟳ Loading semantic model…'}
        </p>
      </div>
    </div>
  )
}
