import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Certifications from '../components/sections/Certifications'
import Blogs from '../components/sections/Blogs'
import Contact from '../components/sections/Contact'
import Chatbot from '../components/chatbot/Chatbot'

export default function Test() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-8">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Blogs />
        <Contact />
        <Chatbot />
      </main>
      <Footer />
    </div>
  )
}
