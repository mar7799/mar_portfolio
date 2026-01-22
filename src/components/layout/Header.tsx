import ThemeToggle from '../common/ThemeToggle'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import Button from '../ui/Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <h1 className="font-bold">Amram Raju Madipalli</h1>
        <div className="flex gap-2">
          <a href="https://github.com/mar7799"><Button variant="ghost"><FiGithub /></Button></a>
          <a href="https://linkedin.com/in/..."><Button variant="ghost"><FiLinkedin /></Button></a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
