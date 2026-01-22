import { useState } from 'react'
import ChatWindow from './ChatWindow'

export default function Chatbot() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 text-white p-4 shadow-lg hover:scale-105 transition"
      >
        💬
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  )
}
