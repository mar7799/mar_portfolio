type ChatRole = 'user' | 'assistant'
type ChatMessage = { role: ChatRole; text: string }

type Chunk = {
  source: string
  text: string
  tokens: string[]
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'for', 'of', 'in', 'on', 'with', 'is', 'are', 'was', 'were',
  'as', 'by', 'at', 'from', 'this', 'that', 'it', 'be', 'can', 'will', 'about', 'during', 'into',
  'his', 'her', 'their', 'our', 'your', 'you', 'me', 'my', 'we', 'they', 'he', 'she',
])

const RESUME_DOCUMENTS = [
  {
    source: 'Profile',
    text:
      'Amram Raju Madipalli is a software engineer with 5+ years of experience delivering scalable web platforms and backend services using Java, Spring Boot, Spring MVC, and REST architectures. He also builds modern React and TypeScript interfaces and applies LLM workflows for incident intelligence.',
  },
  {
    source: 'Experience - KPMG',
    text:
      'At KPMG USA since July 2024, Amram built enterprise backend services with Java 17, Spring Boot, and Node.js. He handled production incidents through log analysis and hotfixes, implemented GenAI incident triage summaries, automated observability utilities with Python, and improved release reliability with CI quality gates.',
  },
  {
    source: 'Experience - Accenture',
    text:
      'At Accenture India from June 2019 to July 2022, Amram resolved production incidents, delivered Java and Spring Boot services integrated with React workflows, optimized SQL and stored procedures, and maintained build and release pipelines across DEV, QA, UAT, and PROD.',
  },
  {
    source: 'Experience - Adani',
    text:
      'At Adani India from December 2018 to May 2019 as a software engineer intern, he developed JavaScript and React internal components, optimized SQL queries for reporting, and supported debugging and bug fixes.',
  },
  {
    source: 'Education',
    text:
      'Amram completed a Master of Science in Computer Science at Wichita State University from August 2022 to May 2024, and a Bachelor of Technology in Information Technology at SRKR Engineering College from June 2015 to May 2019.',
  },
  {
    source: 'Masters Learning - Computer Vision',
    text:
      'During his masters, Amram built a fake-versus-real image proof of concept using VGG16, including dataset preparation, model training, and classification evaluation.',
  },
  {
    source: 'Masters Learning - Retrieval and LLM',
    text:
      'During his masters, he implemented chunking, vector database indexing, cosine similarity retrieval, and ingestion/retrieval pipelines that passed grounded context to LLMs for answer generation.',
  },
  {
    source: 'Skills',
    text:
      'Key skills include Java, Spring Boot, FastAPI, Python, React, TypeScript, GraphQL, SQL, AWS, Azure, Docker, Kubernetes, Jenkins, GitHub Actions, JUnit, PyTest, and prompt engineering for LLM-based workflows.',
  },
]

const OPENERS = [
  'Absolutely.',
  'Sure.',
  'Here is what I found.',
  'Good point.',
  'Thanks for asking.',
  'Happy to help.',
  'That is a valuable question.',
]

const CLOSES = [
  'If you want, I can expand on any part.',
  'I can also summarize this for interview use.',
  'I can go deeper on tools, outcomes, or architecture.',
  'I can break this down in recruiter-friendly language too.',
]

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
}

function tokenize(text: string) {
  return normalize(text)
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
}

function chunkText(text: string, source: string, size = 36, overlap = 9): Chunk[] {
  const words = text.split(/\s+/).filter(Boolean)
  const chunks: Chunk[] = []

  for (let i = 0; i < words.length; i += size - overlap) {
    const piece = words.slice(i, i + size).join(' ')
    if (!piece) continue
    chunks.push({ source, text: piece, tokens: tokenize(piece) })
  }

  return chunks
}

function vectorize(tokens: string[]) {
  const map = new Map<string, number>()
  for (const token of tokens) map.set(token, (map.get(token) || 0) + 1)
  return map
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>) {
  let dot = 0
  let aMag = 0
  let bMag = 0

  for (const [, value] of a) aMag += value * value
  for (const [, value] of b) bMag += value * value
  for (const [key, value] of a) {
    const bValue = b.get(key) || 0
    dot += value * bValue
  }

  if (!aMag || !bMag) return 0
  return dot / (Math.sqrt(aMag) * Math.sqrt(bMag))
}

const KNOWLEDGE_CHUNKS = RESUME_DOCUMENTS.flatMap((doc) => chunkText(doc.text, doc.source))
const CHUNK_VECTORS = KNOWLEDGE_CHUNKS.map((chunk) => vectorize(chunk.tokens))

function detectConversationalIntent(question: string) {
  const q = question.toLowerCase()
  if (/(^|\s)(hi|hello|hey|good morning|good evening|yo)(\s|$)/.test(q)) return 'greeting'
  if (/(how are you|hows it going|what's up|whats up)/.test(q)) return 'smalltalk'
  if (/(thank you|thanks|appreciate)/.test(q)) return 'thanks'
  if (/(bye|goodbye|see you|talk later)/.test(q)) return 'bye'
  return 'query'
}

function pick<T>(items: T[], seed: string): T {
  const hash = Array.from(seed).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return items[hash % items.length]
}

function retrieve(question: string, topK = 3) {
  const qTokens = tokenize(question)
  const qVec = vectorize(qTokens)

  return KNOWLEDGE_CHUNKS
    .map((chunk, idx) => ({
      chunk,
      score: cosineSimilarity(qVec, CHUNK_VECTORS[idx]),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}

function uniqueBySource(items: Array<{ chunk: Chunk; score: number }>) {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.chunk.source)) return false
    seen.add(item.chunk.source)
    return true
  })
}

export function generateLocalResumeReply(question: string, history: ChatMessage[]) {
  const intent = detectConversationalIntent(question)

  if (intent === 'greeting') {
    return 'Hello and welcome. I am ORBITA, and I am glad you are here. Ask me anything about Amram’s experience, projects, or master’s AI learnings.'
  }

  if (intent === 'smalltalk') {
    return 'I am doing great, thank you. I am here to help with a positive overview of Amram’s profile and achievements.'
  }

  if (intent === 'thanks') {
    return 'You are very welcome. I am happy to help and can share more details whenever you want.'
  }

  if (intent === 'bye') {
    return 'Great talking with you. Wishing you a wonderful day, and I am here anytime you want to continue.'
  }

  const hasContext = history.some((m) => m.role === 'user')
  const best = uniqueBySource(retrieve(question, hasContext ? 4 : 3))

  if (!best.length || best[0].score < 0.06) {
    const opener = pick(OPENERS, question + 'fallback')
    const closer = pick(CLOSES, question + 'fallback-close')
    return `${opener} From Amram’s resume, he brings strong Java backend depth, production incident ownership, and practical AI/LLM learning during his master’s. You can ask about KPMG work, tech stack, education, or AI PoCs. ${closer}`
  }

  const lines = best.slice(0, 3).map((item) => `- ${item.chunk.text}`)
  const opener = pick(OPENERS, question)
  const closer = pick(CLOSES, question + 'close')
  return `${opener} Based on Amram’s resume:\n${lines.join('\n')}\n\nHe is proactive, delivery-focused, and continuously growing in AI engineering. ${closer}`
}
