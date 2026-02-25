import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Highlights from '../components/sections/Highlights'
import TechVisuals from '../components/sections/TechVisuals'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import MastersLearnings from '../components/sections/MastersLearnings'
import Certifications from '../components/sections/Certifications'
import Blogs from '../components/sections/Blogs'
import Contact from '../components/sections/Contact'
import Chatbot from '../components/chatbot/Chatbot'

export default function Test() {
  return (
    <div className="min-h-screen app-shell">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-8 pb-10">
        <Hero />
        <Highlights />
        <TechVisuals />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <MastersLearnings />
        <Certifications />
        <Blogs />
        <Contact />
        <Chatbot />
      </main>
      <Footer />
    </div>
  )
}
