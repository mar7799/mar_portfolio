import { useEffect, useMemo, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

export default function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode')
    return saved === 'light' || saved === 'dark' || saved === 'system'
      ? saved
      : 'system'
  })

  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    mode === 'system' ? getSystemTheme() : mode
  )

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  // Persist mode
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  // Listen to OS theme changes (ONLY in system mode)
  useEffect(() => {
    if (mode !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setResolvedTheme(getSystemTheme())

    handler() // initial sync

    mq.addEventListener
      ? mq.addEventListener('change', handler)
      : mq.addListener(handler)

    return () => {
      mq.removeEventListener
        ? mq.removeEventListener('change', handler)
        : mq.removeListener(handler)
    }
  }, [mode])

  // Update resolved theme when mode changes
  useEffect(() => {
    setResolvedTheme(mode === 'system' ? getSystemTheme() : mode)
  }, [mode])

  return useMemo(
    () => ({
      theme: resolvedTheme,
      mode,
      setLight: () => setMode('light'),
      setDark: () => setMode('dark'),
      setSystem: () => setMode('system'),
      toggle: () =>
        setMode((prev) =>
          prev === 'dark' ? 'light' : 'dark'
        ),
    }),
    [mode, resolvedTheme]
  )
}
