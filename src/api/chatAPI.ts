const API_BASE = import.meta.env.VITE_AI_API_URL;

export default async function sendChatMessage(
  message: string,
  history: { role: string; content: string }[]
) {
    console.log("API_BASE:", API_BASE);
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history })
  });

  if (!res.ok) {
    throw new Error("AI server error");
  }

  return res.json();
}
