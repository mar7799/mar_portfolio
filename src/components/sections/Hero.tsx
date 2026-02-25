import { useState } from 'react'
import { FiDownload, FiMail, FiExternalLink } from 'react-icons/fi'
import Button from '../ui/Button'
import Card from '../common/Card'
import my_resume from '../../assets/Amram M Full Stack.docx'

export default function Hero() {
  const [avatarError, setAvatarError] = useState(false)
  const avatarSrc = `${import.meta.env.BASE_URL}orbit-avatar.jpg`
  const fallbackSrc = `${import.meta.env.BASE_URL}orbit-avatar-fallback.svg`

  return (
    <section className="py-8 md:py-14">
      <div className="grid md:grid-cols-3 gap-8 items-center">

        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] soft-text">Professional Portfolio</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
            <span className="gradient-text">Java AI Engineer</span><br />
            Building Production-Grade Intelligent Systems
          </h1>

          <p className="mt-4 text-lg soft-text max-w-2xl">
            Software Engineer with 5+ years of experience delivering scalable Java and Spring Boot services,
            modern React frontends, and FastAPI + LLM automation for production incident intelligence and operations.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="hero-badge rounded-full px-3 py-1">Java 8/11/17</span>
            <span className="hero-badge rounded-full px-3 py-1">Spring Boot + GraphQL</span>
            <span className="hero-badge rounded-full px-3 py-1">FastAPI + Python</span>
            <span className="hero-badge rounded-full px-3 py-1">VGG16 + Classification</span>
            <span className="hero-badge rounded-full px-3 py-1">Chunking + Vector Retrieval</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={my_resume} target="_blank" rel="noreferrer">
              <Button variant="default" size="md" className="inline-flex items-center gap-2">
                <FiDownload /> Download Resume
              </Button>
            </a>

            <a href="mailto:amrammadipalli@gmail.com">
              <Button variant="default" size="md" className="inline-flex items-center gap-2">
                <FiMail /> Email
              </Button>
            </a>
          </div>
        </div>

        <Card>
          <div className="mb-4">
            <img
              src={avatarError ? fallbackSrc : avatarSrc}
              onError={() => setAvatarError(true)}
              alt="Amram ORBITA avatar"
              className="w-full h-[360px] object-cover object-[center_22%] rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900"
            />
          </div>

          <p className="text-sm uppercase tracking-widest soft-text mb-2">Quick Access</p>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="soft-text">GitHub</span>
              <a
                href="https://github.com/mar7799"
                className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-300 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open <FiExternalLink />
              </a>
            </li>

            <li className="flex items-center justify-between">
              <span className="soft-text">LinkedIn</span>
              <a
                href="https://linkedin.com/in/amram-raju-madipalli-694296242"
                className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-300 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open <FiExternalLink />
              </a>
            </li>

            <li className="flex items-center justify-between">
              <span className="soft-text">Experience</span>
              <a
                href="#experience"
                className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-300 hover:underline"
              >
                View <FiExternalLink />
              </a>
            </li>
          </ul>
        </Card>

      </div>
    </section>
  )
}
