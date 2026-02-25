import { useState } from "react";
import { generateLocalResumeReply } from "./localResumeAssistant";

type Msg = { role: "user" | "assistant"; text: string };
type ChatWindowProps = { onClose?: () => void };

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const avatarSrc = `${import.meta.env.BASE_URL}orbita-1772003447.png`
  const fallbackSrc = `${import.meta.env.BASE_URL}orbit-avatar-fallback.svg`
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hello. I am ORBITA, Amram's AI assistant. I can answer questions from his resume, projects, and master's AI learnings." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMsg: Msg = { role: "user", text: input };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const reply = generateLocalResumeReply(input, nextMessages);
    setTimeout(() => {
      setMessages(m => [...m, { role: "assistant", text: reply }]);
      setLoading(false);
    }, 350);
  }

  return (
    <div className="fixed bottom-6 right-6 w-[360px] h-[520px] bg-slate-950 border border-cyan-400 shadow-[0_0_24px_rgba(34,211,238,.45)] rounded-xl flex flex-col overflow-hidden">
      
      <div className="p-3 border-b border-cyan-400 text-cyan-300 font-semibold flex items-center justify-between">
        <span className="flex items-center gap-2">
          <img
            src={avatarSrc}
            onError={(e) => { e.currentTarget.src = fallbackSrc }}
            alt="ORBITA avatar"
            className="orbit-mini-avatar"
          />
          ORBITA // AI Portfolio Assistant
        </span>
        <button onClick={onClose} className="text-xs border border-cyan-400 rounded px-2 py-0.5 hover:bg-cyan-950">
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-2 rounded ${
              m.role === "user"
                ? "ml-auto bg-blue-700 text-blue-50"
                : "bg-slate-900 text-cyan-100 border border-cyan-900"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="text-cyan-400 animate-pulse">AI typing...</div>}
      </div>

      <div className="p-2 border-t border-cyan-400 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask about experience, education, or master's AI learnings..."
          className="flex-1 bg-slate-950 border border-cyan-700 rounded px-3 py-2 text-cyan-200 outline-none"
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 border border-cyan-400 rounded text-cyan-200 hover:bg-cyan-950"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
