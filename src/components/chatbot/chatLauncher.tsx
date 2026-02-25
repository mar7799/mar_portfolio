import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow />}
      
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black border border-green-400 text-green-400 text-xl shadow-[0_0_18px_rgba(57,255,20,.8)] hover:scale-105 transition"
      >
        🐧
      </button>
    </>
  );
}
