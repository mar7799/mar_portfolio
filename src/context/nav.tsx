import { createContext, useContext, useState, ReactNode } from 'react'

export type Page =
  | 'home'
  | 'llm-blog'
  | 'system-design-blog'
  | 'projects-blog'
  | 'llm-incident-blog'
  | 'java-python-arch-blog'
  | 'reliability-blog'

interface NavContextType {
  page: Page
  go: (p: Page) => void
}

const NavContext = createContext<NavContextType>({ page: 'home', go: () => {} })

export const useNav = () => useContext(NavContext)

export function NavProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('home')
  return (
    <NavContext.Provider value={{ page, go: setPage }}>
      {children}
    </NavContext.Provider>
  )
}
