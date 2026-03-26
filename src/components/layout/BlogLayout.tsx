import { ReactNode, useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import ThemeToggle from '../common/ThemeToggle'
import { useNav } from '../../context/nav'

interface Section { id: string; label: string }

interface BlogLayoutProps {
  tag: string
  title: string
  subtitle: string
  author?: string
  date?: string
  readTime?: string
  sections?: Section[]
  children: ReactNode
}

export default function BlogLayout({
  tag,
  title,
  subtitle,
  author = 'Amram Raju Madipalli',
  date = 'March 2026',
  readTime,
  sections = [],
  children,
}: BlogLayoutProps) {
  const { go } = useNav()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => go('home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FiArrowLeft className="shrink-0" />
            Back to Portfolio
          </button>
          {sections.length > 0 && (
            <nav className="hidden lg:flex items-center gap-1 text-xs overflow-x-auto">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          )}
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 mb-4">
            {tag}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-5 max-w-3xl">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{author}</span>
            <span>·</span>
            <span>{date}</span>
            {readTime && <><span>·</span><span>{readTime}</span></>}
          </div>
        </div>

        {children}

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => go('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            <FiArrowLeft />
            Back to Portfolio
          </button>
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Amram Raju Madipalli · Java AI Engineer
        </div>
      </footer>
    </div>
  )
}
