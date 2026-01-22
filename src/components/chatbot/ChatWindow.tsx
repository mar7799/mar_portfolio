import { useState } from 'react'
import {getBotReply}  from './ChatLogic'

type Message = { role: 'user' | 'bot'; text: string }

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi 👋 Ask me about Amram’s experience, projects, or skills.' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', text: input }
    const botMsg = { role: 'bot', text: getBotReply(input) }

    setMessages((m) => [...m, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white dark:bg-gray-900 border rounded-2xl shadow-xl flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <span className="font-semibold">Portfolio Assistant</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm p-2 rounded-lg ${
              m.role === 'user'
                ? 'bg-indigo-500 text-white self-end'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-2 text-sm dark:bg-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  )
}
