import { NavProvider, useNav } from './context/nav'
import Test from './pages/Test'
import LLMBlogPage from './pages/LLMBlogPage'
import SystemDesignBlogPage from './pages/SystemDesignBlogPage'
import ProjectsBlogPage from './pages/ProjectsBlogPage'
import LLMIncidentBlogPage from './pages/LLMIncidentBlogPage'
import JavaPythonArchBlogPage from './pages/JavaPythonArchBlogPage'
import ReliabilityBlogPage from './pages/ReliabilityBlogPage'

function AppContent() {
  const { page } = useNav()
  switch (page) {
    case 'llm-blog':              return <LLMBlogPage />
    case 'system-design-blog':    return <SystemDesignBlogPage />
    case 'projects-blog':         return <ProjectsBlogPage />
    case 'llm-incident-blog':     return <LLMIncidentBlogPage />
    case 'java-python-arch-blog': return <JavaPythonArchBlogPage />
    case 'reliability-blog':      return <ReliabilityBlogPage />
    default:                      return <Test />
  }
}

function App() {
  return (
    <NavProvider>
      <AppContent />
    </NavProvider>
  )
}

export default App
