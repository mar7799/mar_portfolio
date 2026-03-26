import { useState, useRef, useEffect } from 'react'
import ThemeToggle from '../common/ThemeToggle'
import { FiGithub, FiLinkedin, FiChevronDown } from 'react-icons/fi'
import Button from '../ui/Button'
import { useNav } from '../../context/nav'
import type { Page } from '../../context/nav'

const BLOG_LINKS: { label: string; page: Page; tag: string }[] = [
  { label: 'GenAI / LLM Engineering', page: 'llm-blog', tag: 'GenAI' },
  { label: 'System Design From the Trenches', page: 'system-design-blog', tag: 'System Design' },
  { label: 'Five Projects That Shaped My Thinking', page: 'projects-blog', tag: 'Projects' },
  { label: 'LLM Summarization for Incident Triage', page: 'llm-incident-blog', tag: 'AI Workflows' },
  { label: 'Hybrid Java + Python for Enterprise AI', page: 'java-python-arch-blog', tag: 'Architecture' },
  { label: 'CI Quality Gates, SQL Tuning & Observability', page: 'reliability-blog', tag: 'DevOps' },
]

export default function Header() {
  const { go } = useNav()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/65 dark:bg-slate-900/65 backdrop-blur border-b border-white/40 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 min-h-16 py-2 flex justify-between items-center gap-2">
        <h1 className="font-bold leading-tight whitespace-nowrap">
          <span className="text-sm md:hidden">Amram | Java AI Engineer</span>
          <span className="hidden md:inline text-base">Amram Raju Madipalli | Java AI Engineer</span>
        </h1>

        <div className="flex gap-1 md:gap-2 shrink-0 items-center">
          {/* Blog dropdown */}
          <div className="relative hidden sm:block" ref={ref}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors border border-indigo-200 dark:border-indigo-700"
            >
              Articles
              <FiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={12} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden z-50">
                {BLOG_LINKS.map((b) => (
                  <button
                    key={b.page}
                    onClick={() => { go(b.page); setOpen(false) }}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors text-left group"
                  >
                    <span className="inline-flex shrink-0 mt-0.5 text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 leading-tight">
                      {b.tag}
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 leading-snug transition-colors">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="https://github.com/mar7799" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm"><FiGithub /></Button>
          </a>
          <a href="https://www.linkedin.com/in/amram7779" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm"><FiLinkedin /></Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
