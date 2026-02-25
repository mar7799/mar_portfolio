import { useState } from 'react'
import ChatWindow from './ChatWindow'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const avatarSrc = `${import.meta.env.BASE_URL}orbita-1772003447.png`
  const fallbackSrc = `${import.meta.env.BASE_URL}orbit-avatar-fallback.svg`

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-transparent p-0 shadow-md hover:scale-105 transition"
        >
          <img
            src={avatarSrc}
            onError={(e) => { e.currentTarget.src = fallbackSrc }}
            alt="ORBITA avatar"
            className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-xl object-cover object-center"
          />
        </button>
      )}

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  )
}
