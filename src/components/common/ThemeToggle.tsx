import useTheme  from '../../hooks/useTheme'
import Button from '../ui/Button'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {theme === 'dark' ? '🌞' : '🌙'}
    </Button>
  )
}
