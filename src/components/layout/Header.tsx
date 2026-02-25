import ThemeToggle from '../common/ThemeToggle'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import Button from '../ui/Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/65 dark:bg-slate-900/65 backdrop-blur border-b border-white/40 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 min-h-16 py-2 flex justify-between items-center gap-2">
        <h1 className="font-bold leading-tight whitespace-nowrap">
          <span className="text-sm md:hidden">Amram | Java AI Engineer</span>
          <span className="hidden md:inline text-base">Amram Raju Madipalli | Java AI Engineer</span>
        </h1>
        <div className="flex gap-1 md:gap-2 shrink-0">
          <a href="https://github.com/mar7799" target="_blank" rel="noreferrer"><Button variant="ghost" size="sm"><FiGithub /></Button></a>
          <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" target="_blank" rel="noreferrer"><Button variant="ghost" size="sm"><FiLinkedin /></Button></a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
