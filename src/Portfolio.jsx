import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiDownload } from 'react-icons/fi'
import my_resume from './assets/Amram M Full Stack.docx'
import Button from './components/ui/Button'

// --- Data (kept compact) ---
const SKILLS = [
  { title: 'Backend', items: ['Java 8–17', 'Spring Boot / MVC', 'Hibernate / JPA', 'REST APIs', 'Microservices'] },
  { title: 'Frontend', items: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind'] },
  { title: 'Cloud & DevOps', items: ['AWS (ECS, S3, Lambda, RDS)', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'] },
  { title: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { title: 'Messaging', items: ['Kafka', 'RabbitMQ', 'SQS'] },
  { title: 'Observability', items: ['ELK (Elastic, Logstash, Kibana)', 'Prometheus', 'Grafana'] },
  { title: 'Resilience', items: ['Resilience4j', 'Circuit Breakers', 'Rate Limiting'] },
]

const PROJECTS = [
  {
    name: 'Inventory Management Microservices Platform',
    year: '2023',
    role: 'Lead Developer',
    stack: 'Java 17, Spring Boot, Kafka, MongoDB, React, Docker, AWS ECS, ELK Stack',
    bullets: [
      'Architected 5+ microservices handling 10k+ daily transactions.',
      'Centralized logging with ELK; MTTR reduced by ~40%.',
      'Resilience4j-based fault tolerance; uptime improved to 99.9%.',
    ],
  },
  {
    name: 'Banking Customer Onboarding Portal',
    year: '2022',
    role: 'Full-Stack Developer',
    stack: 'Java 11, Spring Boot, React, PostgreSQL, Docker, AWS Lambda',
    bullets: ['OAuth2 + JWT auth; secure onboarding flows.', 'Integrated KYC APIs; manual verification time cut by ~60%.', 'Containerized and deployed on AWS ECS.'],
  },
  {
    name: 'E-commerce Order Tracking Dashboard',
    year: '2021',
    role: 'Backend Developer',
    stack: 'Java 8, Spring MVC, MySQL, AngularJS, Jenkins',
    bullets: ['Realtime order tracking REST APIs.', 'Query tuning + caching dropped p95 from 2s → 200ms.'],
  },
]

const EXPERIENCE = [
  {
    company: 'Ford Motor Company',
    title: 'Senior Full-Stack Developer',
    period: '2023 – Present',
    bullets: [
      'Designed microservices for high-throughput systems (Java, Spring Boot).',
      'Built responsive React UIs integrated with REST APIs.',
      'CI/CD with GitHub Actions; deployments on AWS ECS.',
    ],
  },
  {
    company: 'VR Della Infotech',
    title: 'Full-Stack Developer',
    period: '2021 – 2022',
    bullets: ['Delivered multi-tenant SaaS for e-commerce.', 'Reusable React components + state management.', 'Kafka for async order/payment pipelines.'],
  },
  { company: 'Intellect Design Arena', title: 'Java Developer', period: '2019 – 2021', bullets: ['Enterprise REST APIs for banking systems.', 'Automated tests; release quality up ~30%.'] },
]

const CERTS = [
  { name: 'AWS Solutions Architect – Associate', year: '2024' },
  { name: 'Oracle Certified Professional: Java SE 11 Developer', year: '2023' },
]

const BLOGS = [
  { title: 'Integrating Resilience4j with Spring Boot', href: '#' },
  { title: 'Deploying Java Full-Stack Apps to AWS with GitHub Actions', href: '#' },
  { title: 'Optimizing Java REST APIs from 2s to 200ms', href: '#' },
]

// --- Theme hook (browser-safe + Tailwind-friendly) ---
function useTheme() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  // Resolve initial theme after mount to avoid SSR/localStorage issues
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
    setMounted(true)
  }, [])

  // Sync theme to <html> for Tailwind's `dark:` selector
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.dataset.theme = theme
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  // Follow OS preference until the user chooses explicitly
  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark' || saved === 'light') return
      setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mounted])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return useMemo(() => ({ theme, toggle, mounted }), [theme, mounted, toggle])
}

// --- Small presentational components ---
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-6 md:py-8">
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-6 md:p-8">
      <div className="mb-6">
        <div className="h-1 w-16 bg-indigo-500 rounded mb-3" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      {children}
    </div>
  </section>
)

const Card = ({ children }) => (
  <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-shadow backdrop-blur-md p-6">
    {children}
  </div>
)

function Hero() {
  return (
    <section className="py-8 md:py-14">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Senior Java Full-Stack Developer</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">6+ years designing, building, and deploying scalable enterprise apps with <span className="font-semibold">Java, Spring Boot, React</span>.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={my_resume} target="_blank" rel="noreferrer">
              <Button variant="default" size="md" className="inline-flex items-center gap-2"><FiDownload /> Download Resume</Button>
            </a>
            <a href="mailto:rajuamram99@gmail.com">
              <Button variant="default" size="md" className="inline-flex items-center gap-2"><FiMail /> Email</Button>
            </a>
          </div>
        </div>

        <Card>
          <p className="text-sm uppercase tracking-widest text-indigo-500 mb-2">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>GitHub</span>
              <a href="https://github.com/mar7799" className="inline-flex items-center gap-1 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded" target="_blank" rel="noreferrer">
                Open <FiExternalLink />
              </a>
            </li>
            <li className="flex items-center justify-between">
              <span>LinkedIn</span>
              <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" className="inline-flex items-center gap-1 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded" target="_blank" rel="noreferrer">
                Open <FiExternalLink />
              </a>
            </li>
            <li className="flex items-center justify-between">
              <span>Blog</span>
              <a href="#blog" className="inline-flex items-center gap-1 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded">
                Jump <FiExternalLink />
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  )
}

export default function Portfolio() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      {/* Sticky header (no overlap) */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Amram Raju Madipalli</h1>
          <div className="flex items-center gap-3">
            <a href="https://github.com/mar7799" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-800 transform hover:scale-105 transition"><FiGithub /></Button>
            </a>
            <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-800 transform hover:scale-105 transition"><FiLinkedin /></Button>
            </a>
            <button onClick={toggle} aria-label="Toggle theme" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-800 transform hover:scale-105 transition">{theme === 'dark' ? '🌞' : '🌙'}</Button>
            </button>
          </div>
        </div>
      </header>

      <main id="home" className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
        <Hero />

        <Section id="skills" title="Skills Snapshot">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((g) => (
              <Card key={g.title}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">{it}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Featured Projects (3)">
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <Card key={p.name}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{p.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.role} • {p.year}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.split(',').map((s) => (
                      <span key={s} className="text-xs bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-sm list-disc list-inside">
                  {p.bullets.map((b,i)=><li key={i} className="text-gray-700 dark:text-gray-300">{b}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Professional Experience">
          <div className="space-y-5">
            {EXPERIENCE.map((e) => (
              <Card key={e.company + e.title}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{e.title} — {e.company}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{e.period}</span>
                </div>
                <ul className="mt-3 list-disc list-inside space-y-1 text-sm">{e.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="certs" title="Certifications">
          <div className="grid md:grid-cols-2 gap-5">
            {CERTS.map((c) => (
              <Card key={c.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{c.year}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="blog" title="Technical Articles">
          {BLOGS.length ? (
            <div className="grid md:grid-cols-2 gap-5">
              {BLOGS.map((b) => (
                <Card key={b.title}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{b.title}</span>
                    <a className="inline-flex items-center gap-1 text-sm hover:text-indigo-500" href={b.href}>
                      Read <FiExternalLink />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No posts yet. Coming soon.</p>
          )}
        </Section>

        <Section id="contact" title="Contact">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Open to roles and collaborations</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Let’s build something</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:rajuamram99@gmail.com"><Button variant="default" size="md" className="inline-flex items-center gap-2"><FiMail /> Email Me</Button></a>
                <a href="https://github.com/mar7799" target="_blank" rel="noreferrer"><Button variant="ghost" size="md" className="inline-flex items-center gap-2"><FiGithub /> GitHub</Button></a>
                <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" target="_blank" rel="noreferrer"><Button variant="ghost" size="md" className="inline-flex items-center gap-2"><FiLinkedin /> LinkedIn</Button></a>
              </div>
            </div>
          </Card>
        </Section>
      </main>

      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Amram Raju • Built with React • Auto-dark enabled</div>
      </footer>
    </div>
  )
}
