import { useEffect, useState } from 'react'
import Section from '../layout/Section'
import architectureImg from '../../assets/slides/ai-architecture.svg'
import incidentImg from '../../assets/slides/incident-intelligence.svg'
import deliveryImg from '../../assets/slides/fullstack-delivery.svg'

const SLIDES = [
  {
    title: 'Java + FastAPI AI Architecture',
    caption: 'Production pattern: Java services for core workflows, FastAPI for retrieval and LLM orchestration.',
    image: architectureImg,
  },
  {
    title: 'Computer Vision + MLOps PoC',
    caption: 'VGG16 fake-vs-real image classification experiments with evaluation-focused model iteration.',
    image: incidentImg,
  },
  {
    title: 'Dataset Retrieval to LLM Answers',
    caption: 'Chunking, vector indexing, cosine similarity, and grounded LLM responses.',
    image: deliveryImg,
  },
]

export default function Highlights() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  const active = SLIDES[index]

  return (
    <Section id="highlights" title="Visual Highlights">
      <div className="grid lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2 slider-frame reveal-up">
          <img src={active.image} alt={active.title} className="w-full h-[260px] md:h-[360px] object-cover" />
        </div>

        <div className="app-card p-5 reveal-up">
          <p className="text-xs uppercase tracking-widest soft-text">Slide Overview</p>
          <h3 className="mt-2 text-xl font-semibold">{active.title}</h3>
          <p className="mt-3 text-sm soft-text">{active.caption}</p>

          <div className="mt-6 flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`slide-dot ${i === index ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="hero-badge rounded-lg px-3 py-2">5+ years building enterprise software</div>
            <div className="hero-badge rounded-lg px-3 py-2">Java, Spring Boot, FastAPI, React</div>
            <div className="hero-badge rounded-lg px-3 py-2">VGG16, chunking, vector DB, cosine retrieval</div>
          </div>
        </div>
      </div>
    </Section>
  )
}
