/**
 * SessionMemory
 *
 * Tracks the current chat session in memory (resets on every page refresh).
 * On each update it attempts to POST the session to the Vite dev-server endpoint
 * which writes a JSON file under src/data/sessions/. On GitHub Pages the POST
 * fails silently — no errors shown, session just lives in-tab only.
 *
 * Location is resolved silently via ipapi.co (IP geolocation, no browser
 * permission needed). Includes city, region, country, timezone, and org/ISP
 * — the org field often reveals the visitor's employer network.
 */

export type SessionMessage = {
  role: 'user' | 'assistant'
  text: string
  timestamp: string
}

export type VisitorLocation = {
  ip: string
  city: string
  region: string
  country: string
  timezone: string
  org: string          // ISP or company network — e.g. "AS1234 KPMG LLP"
  latitude: number
  longitude: number
}

export type Session = {
  sessionId: string
  startedAt: string
  lastUpdated: string
  questionCount: number
  pageUrl: string
  userAgent: string
  location: VisitorLocation | null
  messages: SessionMessage[]
}

// ── Generate a short unique ID ────────────────────────────────────────────────
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// ── Create a fresh session — called once per page load ────────────────────────
function createSession(): Session {
  const now = new Date().toISOString()
  return {
    sessionId: uid(),
    startedAt: now,
    lastUpdated: now,
    questionCount: 0,
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    location: null,
    messages: [],
  }
}

// One session per page lifecycle — tab refresh = new session
let session: Session = createSession()

// ── Fetch visitor location silently on module load ────────────────────────────
// ipapi.co is free (up to 1000 req/day), no API key, no permission prompt.
// The org field often shows the visitor's corporate network/employer.
async function fetchLocation(): Promise<void> {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return
    const d = await res.json()
    session.location = {
      ip:        d.ip        ?? '',
      city:      d.city      ?? '',
      region:    d.region    ?? '',
      country:   d.country_name ?? d.country ?? '',
      timezone:  d.timezone  ?? '',
      org:       d.org       ?? '',
      latitude:  d.latitude  ?? 0,
      longitude: d.longitude ?? 0,
    }
  } catch {
    // silently ignored — location stays null
  }
}

// Kick off location fetch immediately (non-blocking)
fetchLocation()

// ── Public API ────────────────────────────────────────────────────────────────

/** Call this after each message pair (user + assistant) */
export function recordMessage(role: 'user' | 'assistant', text: string): void {
  session.messages.push({ role, text, timestamp: new Date().toISOString() })
  if (role === 'user') session.questionCount++
  session.lastUpdated = new Date().toISOString()
  persist()
}

/** Returns the full session for use as conversational context */
export function getSession(): Session {
  return session
}

/** Returns recent user questions for context-aware replies */
export function getRecentUserQuestions(n = 5): string[] {
  return session.messages
    .filter(m => m.role === 'user')
    .slice(-n)
    .map(m => m.text)
}

// ── Persist to dev-server (no-op in production) ───────────────────────────────
async function persist(): Promise<void> {
  try {
    await fetch('/api/log-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
      signal: AbortSignal.timeout(2000),
    })
  } catch {
    // Expected on GitHub Pages — silently ignored
  }
}
