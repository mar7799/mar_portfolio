import Section from '../layout/Section'
import Card from '../common/Card'
import javaAiImage from '../../assets/visuals/java-ai-engineering.svg'
import mlRagImage from '../../assets/visuals/ml-rag-pipeline.svg'
import architectureImg from '../../assets/slides/ai-architecture.svg'

const VISUALS = [
  {
    title: 'Java AI Engineering',
    subtitle: 'Java services + FastAPI + LLM orchestration',
    image: javaAiImage,
  },
  {
    title: 'ML + RAG Pipeline',
    subtitle: 'Chunking, ingestion, vectors, cosine retrieval, LLM answers',
    image: mlRagImage,
  },
  {
    title: 'Production Architecture',
    subtitle: 'Scalable microservices and AI integration layers',
    image: architectureImg,
  },
]

export default function TechVisuals() {
  return (
    <Section id="tech-visuals" title="AI/ML & Java Engineering Visuals">
      <div className="grid md:grid-cols-3 gap-5">
        {VISUALS.map((item) => (
          <Card key={item.title}>
            <img src={item.image} alt={item.title} className="w-full h-44 object-cover rounded-xl border border-slate-300 dark:border-slate-700" />
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="text-sm soft-text mt-1">{item.subtitle}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
