import { SemanticEngine } from './SemanticEngine'

type ChatMessage = { role: 'user' | 'assistant'; text: string }

// ── Intent detection ──────────────────────────────────────────────────────────
type Intent =
  | 'greeting' | 'smalltalk' | 'thanks' | 'bye'
  | 'verify'         // "is this real?", "is it true?", "can I trust this?"
  | 'location'       // "where is he?", "what city?", "what state?"
  | 'visa'           // "work authorization", "visa", "sponsorship"
  | 'salary'         // "expected salary", "compensation"
  | 'yearsexp'       // "how many years"
  | 'experience'     // work history, companies, roles
  | 'skills'         // tech stack, languages, tools
  | 'projects'       // built things
  | 'education'      // degrees, university
  | 'ai'             // GenAI, LLM, RAG, ML
  | 'contact'        // how to reach him
  | 'certifications'
  | 'availability'   // is he looking for work?
  | 'general'

function detectIntent(q: string): Intent {
  const t = q.toLowerCase()

  if (/\b(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy)\b/.test(t)) return 'greeting'
  if (/\b(how are you|how'?re you|what'?s up|doing (well|good)|you (ok|okay))\b/.test(t)) return 'smalltalk'
  if (/\b(thank|thanks|appreciate|helpful|great answer)\b/.test(t))            return 'thanks'
  if (/\b(bye|goodbye|see you|talk later|cya|have a good)\b/.test(t))          return 'bye'

  // Authenticity / verification — must check before experience
  if (/\b(real|true|genuine|legit|honest|accurate|verified|actually|fabricat|fake|lie|trust|fact|confirm|valid)\b/.test(t)) return 'verify'

  if (/\b(where|locat|city|state|country|based|live|lives|living|reside|region|timezone|time.?zone|remote|onsite|on.?site|relocat)\b/.test(t)) return 'location'
  if (/\b(visa|sponsor|work.?auth|authorization|h1|h-1|opt|cpt|green.?card|citizen|ead|permit)\b/.test(t)) return 'visa'
  if (/\b(salary|pay|compens|rate|expect|money|package|ctc|lpa|per.?year|annual)\b/.test(t)) return 'salary'
  if (/\b(how many years|years of exp|how long|since when|total exp|yoe)\b/.test(t)) return 'yearsexp'
  if (/\b(open to|looking for|available|hire|hiring|opportunit|recruit|job search|actively)\b/.test(t)) return 'availability'
  if (/\b(cert|certificat|aws cert|oracle cert|credential)\b/.test(t))         return 'certifications'
  if (/\b(work|experience|job|role|position|company|kpmg|accenture|adani|career|history|background)\b/.test(t)) return 'experience'
  if (/\b(skill|tech|stack|language|framework|tool|know|expert|proficien|good at|specializ)\b/.test(t)) return 'skills'
  if (/\b(project|build|built|made|creat|develop|portfolio|app|system|platform|work on)\b/.test(t)) return 'projects'
  if (/\b(school|university|degree|study|edu|master|bachelor|wichita|wsu|college|graduat|ms|msc|btech)\b/.test(t)) return 'education'
  if (/\b(ai|llm|genai|gpt|rag|prompt|vector|embed|ml|machine.?learn|neural|vision|vgg|deep.?learn|transformer|chatbot|openai|azure\s*ai)\b/.test(t)) return 'ai'
  if (/\b(contact|email|reach|linkedin|github|connect|get in touch|message)\b/.test(t)) return 'contact'

  return 'general'
}

// ── Curated, natural responses by intent ─────────────────────────────────────
// These read like a professional assistant speaking on behalf of Amram, not a search result.

const RESPONSES: Record<Intent, string[]> = {

  greeting: [
    "Hi there! I'm ORBITA, Amram's AI portfolio assistant. I'm here to answer any questions you have about his experience, skills, projects, or how to get in touch. What would you like to know?",
    "Hello! Great to have you here. I'm ORBITA — I can tell you about Amram's engineering background, his AI/LLM work, the projects he's built, or anything else on his resume. What are you curious about?",
  ],

  smalltalk: [
    "Doing great, thanks for asking! Ready to tell you all about Amram. What would you like to know?",
    "All good here! What can I help you with today — experience, projects, skills?",
  ],

  thanks: [
    "You're welcome! Happy to help. Feel free to ask anything else — I'm here.",
    "Glad that was useful! If you want to go deeper on anything, just ask.",
  ],

  bye: [
    "Thanks for stopping by! If you'd like to connect with Amram directly, you can reach him at rajuamram99@gmail.com. Have a great day!",
    "Take care! Amram would love to hear from you — LinkedIn: linkedin.com/in/amram7779.",
  ],

  // ── Location — Sheldon-style precise facts ────────────────────────────────
  location: [
    "Ah, an excellent and highly specific question. As of my last verified data point, Amram is physically located in Celina, Texas, USA. For those unfamiliar, Celina is in the Dallas–Fort Worth metroplex, which puts him well within commuting or short-flight range of most major tech hubs in Texas and beyond. He is open to both on-site and remote roles. Fun fact: he didn't need a GPS to confirm this — I simply know.",
    "Confirmed. Celina, Texas — that is his current location. It is in the Dallas–Fort Worth area, one of the fastest-growing tech corridors in the United States. He is open to remote, hybrid, or on-site opportunities in the DFW region and beyond.",
  ],

  // ── Visa / work authorization ─────────────────────────────────────────────
  visa: [
    "Amram is authorized to work in the United States. For specific details on visa status or sponsorship requirements, the best approach is to reach out to him directly — he is happy to discuss this as part of any conversation about a role. You can contact him at rajuamram99@gmail.com.",
  ],

  // ── Salary / compensation ─────────────────────────────────────────────────
  salary: [
    "Amram is open to discussing compensation based on the role, responsibilities, and total package. For specific expectations, the best path is a direct conversation — reach him at rajuamram99@gmail.com or on LinkedIn at linkedin.com/in/amram7779.",
  ],

  // ── Years of experience ───────────────────────────────────────────────────
  yearsexp: [
    "Amram has 5+ years of professional software engineering experience. His timeline: Software Engineer Intern at Adani India (Dec 2018 – May 2019), Software Engineer at Accenture India (Jun 2019 – Jul 2022), then Software Engineer at KPMG USA (Jul 2024 – present). That adds up to 5+ years of hands-on, production-grade engineering — spanning Java backend, full-stack development, and more recently, GenAI/LLM engineering.",
    "Professionally, Amram has been in software engineering since 2018, giving him 5+ years of experience. He started as an intern at Adani, moved to Accenture for 3 years of full-time engineering, completed his Master's at Wichita State University, and is currently at KPMG USA building Java AI systems. So the honest answer is: 5+ years of real, shipped software.",
  ],

  // ── The key one recruiters will ask ──────────────────────────────────────
  verify: [
    "Absolutely — everything on Amram's portfolio reflects his real, lived experience. His roles at KPMG and Accenture are genuine positions he has held, the projects he describes are systems he personally built and shipped to production, and his AI/LLM skills come from hands-on work — including a GenAI incident triage system running at KPMG today. His Master's degree from Wichita State University is completed, and his certifications (AWS Solutions Architect, Oracle Java SE 11) are current. If you'd like to verify anything specific or speak with Amram directly, he's happy to connect — rajuamram99@gmail.com.",
    "Yes, completely. Amram's experience is authentic. The work at KPMG USA — including the GenAI incident triage workflow, GraphQL APIs, and CI quality automation — reflects actual production systems he's designed and maintained. His Accenture tenure involved real incident resolution, Java/Spring Boot delivery, and SQL optimization for enterprise clients. His Master's in Computer Science from Wichita State University is genuine, and his GitHub has public work you can review directly at github.com/mar7799. He's also happy to provide references or discuss his work in detail on a call.",
  ],

  availability: [
    "Amram is open to new opportunities, particularly in Java AI engineering, full-stack development, and GenAI/LLM product roles. He brings a strong combination of enterprise Java depth and hands-on AI experience, which is relatively uncommon. The best way to reach him is rajuamram99@gmail.com or via LinkedIn at linkedin.com/in/amram7779.",
    "Yes — Amram is actively looking for his next opportunity. He's especially interested in roles that combine enterprise backend engineering with AI/ML integration. You can reach him directly at rajuamram99@gmail.com or connect on LinkedIn.",
  ],

  experience: [
    "Amram has 5+ years of professional software engineering experience across two companies.\n\nAt KPMG USA (July 2024–present) he works as a Software Engineer building enterprise Java 17 and Spring Boot services, designing a GenAI incident triage workflow that supports live on-call responses, and implementing GraphQL APIs with Hibernate optimizations.\n\nPrior to that, he spent 3 years at Accenture India (2019–2022) delivering Java/Spring Boot backend services, resolving 20+ production incidents, and maintaining CI/CD pipelines across multi-environment releases.\n\nHe also interned at Adani India in 2018–2019 building internal React/JS tools and supporting SQL reporting workflows.\n\nWould you like more detail on any specific role?",
  ],

  skills: [
    "Amram's core strengths span two areas:\n\nBackend & Java Engineering — Java 8/11/17, Spring Boot, Spring MVC, REST APIs, GraphQL, Hibernate, Node.js. He builds production-grade services with full test coverage, CI/CD integration, and cloud deployment.\n\nAI/LLM Engineering — Prompt Engineering, OpenAI/Azure OpenAI integration, LLM summarization workflows, RAG pipelines (chunking, vector search, grounded answers), token optimization, and hallucination reduction. This is hands-on, production experience — not just coursework.\n\nHe also works with React/TypeScript on the frontend, AWS and Docker/Kubernetes for cloud deployment, and Oracle/PostgreSQL/MongoDB for data.\n\nAnything specific you'd like to dig into?",
  ],

  projects: [
    "Amram has built three notable systems:\n\n1. GenAI Incident Triage Accelerator (KPMG) — A Java 17 + Python workflow that ingests production logs, normalizes them, and uses an LLM to generate structured incident summaries including root cause and remediation guidance. It has supported 10+ live incidents.\n\n2. Enterprise Workflow Service Platform (KPMG) — GraphQL-powered backend for multi-step approval workflows, built with Spring Boot, Hibernate, Oracle, and MySQL. Includes field-level authorization and significant SQL optimization.\n\n3. Cloud Release & Quality Automation — CI/CD pipelines across DEV/QA/UAT/PROD using GitHub Actions, Docker, and Kubernetes, with automated unit, integration, and regression gates.\n\nHe also built a Computer Vision PoC (VGG16 fake-vs-real image classification) and an end-to-end RAG pipeline during his Master's — code is on GitHub. Want more detail on any of these?",
  ],

  education: [
    "Amram holds two degrees:\n\nMaster of Science in Computer Science — Wichita State University, USA (2022–2024). During this he worked on GenAI/RAG pipelines, LLM-QA systems, and a Computer Vision PoC using VGG16 for fake-vs-real image classification.\n\nBachelor of Technology in Information Technology — SRKR Engineering College, India (2015–2019).\n\nHis graduate work is directly applicable to his AI engineering role — it's where he built his first RAG pipeline and hands-on LLM experience.",
  ],

  ai: [
    "AI/LLM engineering is one of Amram's strongest differentiators.\n\nIn production (at KPMG): He built a GenAI incident triage system that transforms raw logs into structured outage summaries using LLMs. This is live, handling real on-call incidents.\n\nTechnically, he has hands-on experience with: Prompt Engineering (system prompts, templates, few-shot), OpenAI and Azure OpenAI API integration, LLM summarization with map-reduce for long documents, RAG fundamentals (chunking, vector indexing, cosine retrieval, grounded generation), token budget management, and output validation to reduce hallucination.\n\nDuring his Master's: He implemented end-to-end RAG pipelines and a Computer Vision PoC with VGG16. Code is available on GitHub at github.com/mar7799/Machine-Learning-Models.\n\nHe's the kind of engineer who understands AI not just conceptually but as a production engineering discipline.",
  ],

  certifications: [
    "Amram holds two active certifications:\n\n• AWS Solutions Architect – Associate (2024)\n• Oracle Certified Professional: Java SE 11 Developer (2023)\n\nBoth are current and reflect his depth in cloud architecture and Java engineering.",
  ],

  contact: [
    "You can reach Amram through any of these:\n\n• Email: rajuamram99@gmail.com\n• LinkedIn: linkedin.com/in/amram7779\n• GitHub: github.com/mar7799\n\nHe's responsive and happy to chat about opportunities, technical discussions, or anything on his portfolio.",
  ],

  general: [
    "Good question! I can tell you about Amram's professional experience, technical skills, the AI/LLM work he's done, his projects, his education, or how to get in touch with him. What would you like to know?",
    "I'm here to give you an accurate, complete picture of Amram's background. You can ask me about his work history, tech stack, GenAI experience, projects, degrees, certifications, or how to reach him — just ask!",
  ],
}

function pick<T>(arr: T[], seed: string): T {
  const h = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0)
  return arr[h % arr.length]
}

// ── Main export ───────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateReply(question: string, _history: ChatMessage[]): Promise<string> {
  const intent = detectIntent(question)

  // All intents have curated responses — use them directly
  if (RESPONSES[intent]) {
    return pick(RESPONSES[intent], question)
  }

  // Fallback: use semantic search as context for a general response
  if (SemanticEngine.ready) {
    const hits = await SemanticEngine.search(question, 3)
    if (hits.length && hits[0].score > 0.3) {
      // Find the most relevant curated intent from the hit sources
      const src = hits[0].chunk.source
      if (src.includes('experience') || src.includes('kpmg') || src.includes('accenture')) return pick(RESPONSES.experience, question)
      if (src.includes('skill'))       return pick(RESPONSES.skills, question)
      if (src.includes('project'))     return pick(RESPONSES.projects, question)
      if (src.includes('education'))   return pick(RESPONSES.education, question)
      if (src.includes('ai'))          return pick(RESPONSES.ai, question)
      if (src.includes('contact'))     return pick(RESPONSES.contact, question)
    }
  }

  return pick(RESPONSES.general, question)
}
