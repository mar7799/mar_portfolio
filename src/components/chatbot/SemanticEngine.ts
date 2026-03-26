import { pipeline } from '@huggingface/transformers'

export type KnowledgeChunk = { source: string; text: string }

// Comprehensive profile knowledge base
const KNOWLEDGE: KnowledgeChunk[] = [
  // ── Identity ──────────────────────────────────────────────────────────────
  { source: 'profile', text: 'Amram Raju Madipalli is a Java AI Engineer with 5+ years of experience in enterprise backend development, AI/LLM engineering, and cloud deployment. He specializes in Java, Spring Boot, GenAI workflows, and integrating LLMs into production systems.' },
  { source: 'profile', text: 'Amram combines strong backend engineering in Java with hands-on AI/ML experience including RAG pipelines, prompt engineering, LLM summarization, and computer vision, making him effective at building end-to-end AI-powered enterprise systems.' },

  // ── KPMG Experience ───────────────────────────────────────────────────────
  { source: 'experience-kpmg', text: 'Amram works at KPMG USA as a Software Engineer since July 2024. He builds and scales enterprise backend services with Java 17, Spring Boot, and Node.js for API-driven business workflows.' },
  { source: 'experience-kpmg', text: 'At KPMG, Amram designed a GenAI incident triage workflow that transforms raw production logs and traces into concise outage summaries and resolution guidance using LLMs, supporting 10+ live on-call incidents.' },
  { source: 'experience-kpmg', text: 'At KPMG, Amram handled production incidents through log analysis and hotfix deployments, closing 25+ tickets and significantly reducing triage time with LLM-assisted summaries.' },
  { source: 'experience-kpmg', text: 'At KPMG, Amram implemented GraphQL APIs and optimized Hibernate and JDBC data access layers for high-volume transactional systems.' },
  { source: 'experience-kpmg', text: 'At KPMG, Amram automated observability workflows using Python utilities for log ingestion, normalization, and enrichment, and improved release reliability with automated CI quality gates.' },

  // ── Accenture Experience ──────────────────────────────────────────────────
  { source: 'experience-accenture', text: 'Amram worked at Accenture India as a Software Engineer from June 2019 to July 2022. He investigated and resolved 20+ live production incidents through log analysis, SQL debugging, and cross-team coordination.' },
  { source: 'experience-accenture', text: 'At Accenture, Amram delivered Java and Spring Boot backend services integrated with React.js user workflows, and refactored complex SQL queries and stored procedures to improve throughput and audit tracking.' },
  { source: 'experience-accenture', text: 'At Accenture, Amram maintained Maven-based build and release pipelines across DEV, QA, UAT, and PROD environments, and supported AWS S3 and EC2 testing and release validation.' },

  // ── Adani Experience ──────────────────────────────────────────────────────
  { source: 'experience-adani', text: 'Amram interned at Adani India from December 2018 to May 2019 as a Software Engineer Intern. He built internal web components with JavaScript and React, optimized SQL queries for reporting, and resolved bugs through log-level debugging.' },

  // ── Education ─────────────────────────────────────────────────────────────
  { source: 'education', text: 'Amram holds a Master of Science in Computer Science from Wichita State University, USA, completed from August 2022 to May 2024.' },
  { source: 'education', text: 'Amram holds a Bachelor of Technology in Information Technology from SRKR Engineering College, India, completed from June 2015 to May 2019.' },

  // ── Projects ──────────────────────────────────────────────────────────────
  { source: 'project-triage', text: 'GenAI Incident Triage Accelerator (KPMG, 2024-present): A production Java 17 and Python workflow that transforms raw logs into structured incident summaries using LLMs. Supported 10+ on-call incidents and reduced triage effort by automating repetitive analysis steps.' },
  { source: 'project-workflow', text: 'Enterprise Workflow Service Platform (KPMG, 2024-present): Backend modules built with Java 17, Spring Boot, Node.js, GraphQL, Hibernate, Oracle, and MySQL powering API-driven business workflows. Includes secure auth controls and SQL/PL/SQL optimizations that improved reporting performance significantly.' },
  { source: 'project-cicd', text: 'Cloud Release and Quality Automation (2019-2024): Stable CI/CD build and deployment pipelines across DEV, QA, UAT, and PROD using Maven, Jenkins, Docker, Kubernetes, GitHub Actions, and AWS S3/EC2. Introduced unit, integration, and regression checks to reduce release defects.' },
  { source: 'project-rag', text: 'RAG Data Pipeline (Graduate Research): Implemented end-to-end retrieval-augmented generation including dataset chunking, vector database indexing, cosine similarity search, and LLM-grounded answer generation. Studied chunk size and overlap effects on retrieval quality.' },
  { source: 'project-vision', text: 'Computer Vision PoC using VGG16 (Graduate Research): Built a fake-vs-real image classification proof of concept using transfer learning with VGG16. Focused on dataset balancing, image preprocessing, and evaluation metrics. Available on GitHub: https://github.com/mar7799/Machine-Learning-Models' },

  // ── AI / GenAI Skills ─────────────────────────────────────────────────────
  { source: 'skills-ai', text: 'Amram has hands-on AI/LLM engineering experience including Prompt Engineering (system/user prompts, templates, few-shot), LLM API Integration with OpenAI and Azure OpenAI, LLM Summarization workflows, Context Injection, RAG fundamentals, token optimization, and output validation and hallucination reduction.' },
  { source: 'skills-ai', text: 'Amram has experience with computer vision using VGG16, classification and regression ML models, vector databases, cosine similarity search, ingestion and retrieval pipelines, and connecting AI inference services to enterprise Java backends.' },

  // ── Backend Skills ────────────────────────────────────────────────────────
  { source: 'skills-backend', text: 'Backend skills: Java 8, Java 11, Java 17, Spring Boot, Spring MVC, JDBC, Hibernate, JPA, REST APIs, GraphQL, Node.js, FastAPI, Flask, Django, microservices architecture.' },
  { source: 'skills-backend', text: 'Amram builds production-grade Java services with Spring Boot including dependency injection, Spring Security for auth, Resilience4j for circuit breakers, Micrometer for metrics, and full test coverage with JUnit and integration tests.' },

  // ── Frontend Skills ───────────────────────────────────────────────────────
  { source: 'skills-frontend', text: 'Frontend skills: React.js, TypeScript, JavaScript ES6+, Redux, Material-UI, Tailwind CSS, HTML5, CSS3. Amram builds responsive UIs integrated with REST and GraphQL APIs.' },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────
  { source: 'skills-cloud', text: 'Cloud and DevOps skills: AWS (EC2, S3, Lambda, SageMaker, ECS), Azure, Docker, Kubernetes, Jenkins, GitHub Actions, CI/CD pipelines, Maven, multi-environment deployment.' },

  // ── Databases ─────────────────────────────────────────────────────────────
  { source: 'skills-data', text: 'Database skills: Oracle, MySQL, PostgreSQL, SQL Server, MongoDB, DynamoDB. Experienced in query optimization, execution plan analysis, stored procedures, indexing strategies, and ORM with Hibernate.' },

  // ── Testing & Observability ───────────────────────────────────────────────
  { source: 'skills-testing', text: 'Testing and observability skills: JUnit, PyTest, Postman, TDD, BDD, CI quality gates, ELK stack (Elasticsearch, Logstash, Kibana), Prometheus, Grafana, structured logging, distributed tracing, and incident response.' },

  // ── Certifications ────────────────────────────────────────────────────────
  { source: 'certifications', text: 'Amram holds an AWS Solutions Architect Associate certification (2024) and an Oracle Certified Professional Java SE 11 Developer certification (2023).' },

  // ── Contact ───────────────────────────────────────────────────────────────
  { source: 'contact', text: 'Contact Amram at email rajuamram99@gmail.com. LinkedIn: https://www.linkedin.com/in/amram7779. GitHub: https://github.com/mar7799.' },
  { source: 'contact', text: 'Amram is open to software engineering roles in Java AI engineering, full-stack development, and GenAI/LLM product engineering. He is available for interviews and collaborations.' },
]

type ProgressCallback = (msg: string) => void

type Extractor = (
  texts: string | string[],
  opts: { pooling: string; normalize: boolean }
) => Promise<{ tolist: () => number[][] }>

class SemanticEngineClass {
  private extractor: Extractor | null = null
  private embeddings: number[][] = []
  private _ready = false
  private _loading = false

  get ready() { return this._ready }
  get loading() { return this._loading }
  get chunks() { return KNOWLEDGE }

  async initialize(onProgress?: ProgressCallback): Promise<void> {
    if (this._ready || this._loading) return
    this._loading = true
    try {
      onProgress?.('Loading AI model…')
      this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        dtype: 'q8',
        progress_callback: (info: { status: string; loaded?: number; total?: number; name?: string }) => {
          if (info.status === 'downloading' && info.loaded && info.total) {
            const pct = Math.round((info.loaded / info.total) * 100)
            onProgress?.(`Downloading model: ${pct}%`)
          }
        },
      } as Parameters<typeof pipeline>[2]) as unknown as Extractor

      onProgress?.('Building knowledge index…')
      const texts = KNOWLEDGE.map((c) => c.text)
      const result = await this.extractor(texts, { pooling: 'mean', normalize: true })
      this.embeddings = result.tolist()
      this._ready = true
      onProgress?.('ready')
    } catch (err) {
      console.error('[SemanticEngine] init error:', err)
      onProgress?.('error')
    } finally {
      this._loading = false
    }
  }

  async search(query: string, topK = 4): Promise<Array<{ chunk: KnowledgeChunk; score: number }>> {
    if (!this._ready || !this.extractor) return []
    const result = await this.extractor(query, { pooling: 'mean', normalize: true })
    const qEmb = result.tolist()[0]
    return KNOWLEDGE
      .map((chunk, i) => ({ chunk, score: this.cosine(qEmb, this.embeddings[i]) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
  }

  private cosine(a: number[], b: number[]): number {
    let dot = 0, am = 0, bm = 0
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i]
      am += a[i] * a[i]
      bm += b[i] * b[i]
    }
    return am && bm ? dot / (Math.sqrt(am) * Math.sqrt(bm)) : 0
  }
}

export const SemanticEngine = new SemanticEngineClass()
