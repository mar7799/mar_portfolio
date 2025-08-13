import React, { useEffect, useMemo, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiDownload } from "react-icons/fi";
import my_resume from "./assets/Amram M Full Stack.docx";

/**
 * Amram Raju — Full‑Stack Portfolio
 * - Adaptive theme: follows system (prefers-color-scheme) with manual toggle persisted in localStorage
 * - Sections: Hero, Skills, Projects, Experience, Certifications, Blog, Contact
 * - Minimal dependencies: react, react-icons (already in your package.json)
 * - Styling: Tailwind CSS utility classes
 *
 * Drop this file into src/Portfolio.jsx and set it as your App component, or import and render <Portfolio />.
 */

const skills = [
  {
    title: "Backend",
    items: [
      "Java 8–17",
      "Spring Boot / MVC",
      "Hibernate / JPA",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "Frontend",
    items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS (ECS, S3, Lambda, RDS)", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
  },
  { title: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "Messaging", items: ["Kafka", "RabbitMQ", "SQS"] },
  {
    title: "Observability",
    items: ["ELK (Elastic, Logstash, Kibana)", "Prometheus", "Grafana"],
  },
  { title: "Resilience", items: ["Resilience4j", "Circuit Breakers", "Rate Limiting"] },
];

const projects = [
  {
    name: "Inventory Management Microservices Platform",
    year: "2023",
    role: "Lead Developer",
    stack:
      "Java 17, Spring Boot, Kafka, MongoDB, React, Docker, AWS ECS, ELK Stack",
    bullets: [
      "Architected 5+ microservices handling 10k+ daily transactions.",
      "Centralized logging with ELK; MTTR reduced by ~40%.",
      "Resilience4j-based fault tolerance; uptime improved to 99.9%.",
    ],
    links: [],
  },
  {
    name: "Banking Customer Onboarding Portal",
    year: "2022",
    role: "Full‑Stack Developer",
    stack: "Java 11, Spring Boot, React, PostgreSQL, Docker, AWS Lambda",
    bullets: [
      "OAuth2 + JWT auth; secure onboarding flows.",
      "Integrated KYC APIs; manual verification time cut by ~60%.",
      "Containerized and deployed on AWS ECS.",
    ],
    links: [],
  },
  {
    name: "E‑commerce Order Tracking Dashboard",
    year: "2021",
    role: "Backend Developer",
    stack: "Java 8, Spring MVC, MySQL, AngularJS, Jenkins",
    bullets: [
      "Realtime order tracking REST APIs.",
      "Query tuning + caching dropped p95 from 2s → 200ms.",
    ],
    links: [],
  },
];

const experience = [
  {
    company: "Ford Motor Company",
    title: "Senior Full‑Stack Developer",
    period: "2023 – Present",
    bullets: [
      "Designed microservices for high‑throughput systems (Java, Spring Boot).",
      "Built responsive React UIs integrated with REST APIs.",
      "CI/CD with GitHub Actions; deployments on AWS ECS.",
    ],
  },
  {
    company: "VR Della Infotech",
    title: "Full‑Stack Developer",
    period: "2021 – 2021",
    bullets: [
      "Delivered multi‑tenant SaaS for e‑commerce.",
      "Reusable React components + state management.",
      "Kafka for async order/payment pipelines.",
    ],
  },
  {
    company: "Intellect Design Arena",
    title: "Java Developer",
    period: "2019 – 2021",
    bullets: [
      "Enterprise REST APIs for banking systems.",
      "Automated tests; release quality up ~30%.",
    ],
  },
];

const certs = [
  { name: "AWS Solutions Architect – Associate", year: "2024" },
  { name: "Oracle Certified Professional: Java SE 11 Developer", year: "2023" },
];

const blogs = [
  {
    title: "Integrating Resilience4j with Spring Boot",
    href: "#",
  },
  { title: "Deploying Java Full‑Stack Apps to AWS with GitHub Actions", href: "#" },
  { title: "Optimizing Java REST APIs from 2s to 200ms", href: "#" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    // default to system
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // react to system changes when user hasn't explicitly chosen
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return; // user override
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return useMemo(() => ({ theme, toggle }), [theme]);
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 shadow-sm p-5">
      {children}
    </div>
  );
}

export default function Portfolio() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      {/* Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Amram Raju Madipalli
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400">Skills</a>
            <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400">Projects</a>
            <a href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400">Experience</a>
            <a href="#certs" className="hover:text-indigo-600 dark:hover:text-indigo-400">Certs</a>
            <a href="#blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blog</a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mar7799"
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin className="text-xl" />
            </a>
            <button
              onClick={toggle}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main id="home" className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Senior Java Full‑Stack Developer
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                6+ years designing, building, and deploying scalable enterprise apps with
                <span className="font-semibold"> Java, Spring Boot, React,</span> and
                cloud‑native architectures. Focused on performance, reliability, and developer experience.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={my_resume}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiDownload /> Download Resume
                </a>
                <a
                  href="mailto:rajuamram99@gmail.com"
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiMail /> rajuamram99@gmail.com
                </a>
              </div>
            </div>
            <Card>
              <p className="text-sm uppercase tracking-widest text-indigo-500 mb-2">Quick Links</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>GitHub</span>
                  <a href="https://github.com/mar7799" className="inline-flex items-center gap-1 hover:text-indigo-500" target="_blank" rel="noreferrer">
                    Open <FiExternalLink />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>LinkedIn</span>
                  <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" className="inline-flex items-center gap-1 hover:text-indigo-500" target="_blank" rel="noreferrer">
                    Open <FiExternalLink />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>Blog</span>
                  <a href="#blog" className="inline-flex items-center gap-1 hover:text-indigo-500">
                    Jump <FiExternalLink />
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Skills */}
        <Section id="skills" title="Skills Snapshot">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((g) => (
              <Card key={g.title}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{g.title}</h3>
                <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Featured Projects (3)">
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <Card key={p.name}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{p.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.role} • {p.year}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">{p.stack}</p>
                <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {p.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm hover:text-indigo-500">
                        {l.label} <FiExternalLink />
                      </a>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Professional Experience">
          <div className="space-y-5">
            {experience.map((e) => (
              <Card key={e.company + e.title}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {e.title} — {e.company}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{e.period}</span>
                </div>
                <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section id="certs" title="Certifications">
          <div className="grid md:grid-cols-2 gap-5">
            {certs.map((c) => (
              <Card key={c.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{c.year}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Blog */}
        <Section id="blog" title="Technical Articles">
          {blogs.length ? (
            <div className="grid md:grid-cols-2 gap-5">
              {blogs.map((b) => (
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

        {/* Contact */}
        <Section id="contact" title="Contact">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Open to roles and collaborations</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Let’s build something</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:rajuamram99@gmail.com"
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiMail /> Email Me
                </a>
                <a
                  href="https://github.com/mar7799"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiGithub /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/amram-raju-madipalli-694296242"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </Card>
        </Section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Amram Raju • Built with React • Auto‑dark enabled
        </div>
      </footer>
    </div>
  );
}
