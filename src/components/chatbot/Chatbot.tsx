import { useState, useEffect } from 'react'
import ChatWindow from './ChatWindow'
import { processAvatar } from '../../utils/processAvatar'

export default function Chatbot() {
  const [open, setOpen]           = useState(false)
  const [processed, setProcessed] = useState<string | null>(null)

  const rawSrc      = `${(import.meta as any).env.BASE_URL}orbita-1772003447.png`
  const fallbackSrc = `${(import.meta as any).env.BASE_URL}orbit-avatar-fallback.svg`

  // Process the avatar image once on mount (remove background, pad top)
  useEffect(() => {
    processAvatar(rawSrc)
      .then(setProcessed)
      .catch(() => setProcessed(fallbackSrc))
  }, [rawSrc, fallbackSrc])

  const avatarSrc = processed ?? rawSrc

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Chat with ORBITA — Amram's AI assistant"
          className="fixed bottom-6 right-6 z-50 p-0 bg-transparent shadow-none hover:scale-105 active:scale-95 transition-transform"
        >
          <div className="relative w-[72px] h-[80px]">
            <img
              src={avatarSrc}
              onError={e => { e.currentTarget.src = fallbackSrc }}
              alt="ORBITA — Chat with Amram's AI assistant"
              className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(34,211,238,0.4)]"
            />
            {/* Pulsing "online" dot */}
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 shadow-[0_0_6px_rgba(52,211,153,.9)]" />
          </div>
        </button>
      )}

      {open && (
        <ChatWindow
          onClose={() => setOpen(false)}
          avatarSrc={avatarSrc}
        />
      )}
    </>
  )
}
