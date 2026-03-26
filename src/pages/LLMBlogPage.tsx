import { useEffect } from 'react'
import { useNav } from '../context/nav'
import ThemeToggle from '../components/common/ThemeToggle'
import { FiArrowLeft } from 'react-icons/fi'

const SECTIONS = [
  {
    id: 'prompt-engineering',
    tag: 'Foundations',
    title: 'Prompt Engineering — System Prompts, User Prompts & Templates',
    body: [
      `The first thing that surprised me was how much a well-crafted prompt actually matters. Coming from a Java background where the contract between caller and API is strict and typed, I expected the LLM to "just work" if I described my intent clearly. What I found was more nuanced.`,
      `System prompts are the invisible backbone. They set the model's persona, constrain its behavior, and establish the rules of the conversation before the user ever says a word. I started treating them like Java interface contracts — clear, concise, non-negotiable. Once I wrote a system prompt that said "You are a structured data extractor. Respond only in valid JSON. Never apologize or explain." — the output reliability jumped dramatically.`,
      `User prompts are the request layer. Where I see most engineers go wrong is treating them as plain natural language. The model does much better when you structure user prompts with explicit role framing ("Act as a senior code reviewer"), task definition ("Review this Java method for null safety"), format specification ("Output as a numbered list"), and examples where needed (few-shot prompting).`,
      `Templates became my standard. I built parameterized prompt templates — essentially string interpolation with placeholders — so the same structure could be reused across inputs. Think of it as dependency injection for prompts: swap the variable, keep the behavior predictable. This also made testing much easier because I could benchmark one variable at a time.`,
      `Key finding: The single biggest quality improvement came not from changing the model, but from investing time in the system prompt and establishing a consistent template pattern.`,
    ],
    accent: 'indigo',
    icon: '🧠',
  },
  {
    id: 'api-integration',
    tag: 'Integration',
    title: 'LLM API Integration — OpenAI & Azure OpenAI',
    body: [
      `When I first hit the OpenAI API, it felt straightforward — a REST call with a JSON body. But integrating it into a production Java + Spring Boot service exposed a different level of complexity.`,
      `The key difference between direct OpenAI and Azure OpenAI is deployment architecture. Azure OpenAI has resource groups, deployment names, and API versions baked into the endpoint. This means you're not just calling a model — you're calling a specific deployment of a model in a specific Azure region. That distinction matters for compliance, latency, and rate limit management.`,
      `I built a thin Java wrapper around the API client that handled: authentication (API key injection via environment variables, never hardcoded), retry logic with exponential backoff (the API will 429 you at scale), timeout configuration, and response deserialization into typed POJOs.`,
      `One thing I learned late: always set a maximum token budget on the response (max_tokens), not just on the input. Without it, a poorly constrained prompt can cause the model to generate endlessly, and your API cost will reflect that.`,
      `Streaming responses (server-sent events) are also worth exploring early. For user-facing chat interfaces, they dramatically improve perceived latency because the UI can render tokens as they arrive rather than waiting for the full response. In Java I used WebFlux/Flux to handle the async stream.`,
      `Key finding: Treat the LLM API like any other unreliable external dependency — wrap it with retries, timeouts, circuit breakers, and observability. The model itself is reliable; the HTTP layer is not.`,
    ],
    accent: 'blue',
    icon: '🔌',
  },
  {
    id: 'summarization',
    tag: 'Workflows',
    title: 'LLM Summarization & Reasoning Workflows',
    body: [
      `Summarization was the first real "AI feature" I shipped — taking long incident logs from our production system and distilling them to a 3-sentence root cause analysis. What looked simple on the surface revealed a series of architectural decisions.`,
      `The naive approach: dump the full log into the prompt and ask for a summary. This breaks instantly on long documents because of context window limits, and the model often "loses focus" on the most important parts buried in the middle (a phenomenon called "lost in the middle").`,
      `My evolved approach: Map-Reduce summarization. Split the log into chunks, summarize each chunk independently (map), then summarize the summaries into a final output (reduce). This scales to arbitrarily long documents and each summarization step stays within a manageable context window.`,
      `Reasoning workflows were a different challenge. For tasks like "analyze this alert and recommend a fix," I found that asking the model to reason step-by-step (chain-of-thought prompting) before answering produced dramatically better results. Instructing the model to "first identify what went wrong, then identify the affected component, then suggest remediation" — explicitly forcing that structure — outperformed a single-shot "fix this" prompt every time.`,
      `I also experimented with multi-step agent workflows: one LLM call to classify the type of problem, a second to pull relevant context based on that classification, and a third to generate the recommendation. Separating concerns at the LLM level mirrors what we already do with microservices.`,
      `Key finding: For complex reasoning, don't ask the model to do everything in one shot. Break it into a workflow where each step has a focused, narrow objective.`,
    ],
    accent: 'violet',
    icon: '⚙️',
  },
  {
    id: 'chunking',
    tag: 'Data Prep',
    title: 'Context Injection & Chunking Strategies',
    body: [
      `Every LLM has a context window — a hard limit on how many tokens it can see at once. For GPT-4, that's roughly 8k–128k tokens depending on the variant. This constraint forces you to be deliberate about what context you inject into each call.`,
      `Chunking is the art of dividing large documents into pieces that fit within that window while preserving semantic coherence. My early mistake was splitting on fixed character counts. The output was incoherent — a sentence about database failures would be split mid-sentence, and neither chunk made sense in isolation.`,
      `I moved to semantic chunking: split on sentence boundaries, then aggregate sentences into chunks that don't exceed a token budget. In Java I used a simple sliding window approach — build up a chunk until adding the next sentence would exceed the limit, then save the chunk and start the next one with a small overlap (2-3 sentences) to maintain context continuity across boundaries.`,
      `Overlap is critical. Without it, the model processing chunk N has no idea what was concluded in chunk N-1. With a 10-15% overlap, you preserve narrative flow and avoid "cold starts" on each chunk.`,
      `Context injection — deciding what to put in the prompt alongside the user's question — is equally important. I learned to differentiate between: system context (always present, defines behavior), retrieved context (dynamic, pulled from RAG based on the query), and conversation history (recent turns to maintain coherence).`,
      `Key finding: How you slice and inject context has as much impact on output quality as the prompt itself. Fixed-size character splits are almost always wrong — split on semantic boundaries with overlap.`,
    ],
    accent: 'emerald',
    icon: '✂️',
  },
  {
    id: 'rag',
    tag: 'Architecture',
    title: 'RAG Fundamentals — Document & Vector Retrieval',
    body: [
      `Retrieval-Augmented Generation (RAG) was the concept that made LLMs feel genuinely useful for enterprise applications to me. Without RAG, an LLM only knows what it was trained on. With RAG, it can answer questions about your private data — your docs, your codebase, your incident history.`,
      `The architecture has two phases. Offline (indexing): take your documents, chunk them, convert each chunk into a vector embedding (a numerical representation of its semantic meaning), and store those vectors in a vector database. Online (retrieval + generation): when a user asks a question, convert that question into a vector, find the top-K most semantically similar chunks in the database, inject those chunks into the prompt as context, and generate an answer grounded in that context.`,
      `Embeddings are the key abstraction. Two semantically similar pieces of text — even if they use different words — will produce vectors that are "close" to each other in the high-dimensional space. This is what enables fuzzy, meaning-based search rather than keyword matching.`,
      `For vector storage I experimented with in-memory FAISS (great for prototyping), pgvector (if you're already on Postgres, zero new infrastructure), and dedicated vector DBs like Pinecone and Qdrant (better for production scale). The choice depends on your scale and operational complexity tolerance.`,
      `One nuance I had to learn: retrieval quality is not just about the vector search. The quality of your chunks matters enormously. If your chunks are too large, the retrieved context is noisy. Too small, and they lose meaning. And the embedding model you choose has a huge effect — domain-specific embeddings outperform general-purpose ones for technical content.`,
      `Key finding: RAG is not magic — it's a pipeline with many failure points. The most common failure is not the LLM; it's poor chunk quality or retrieval that returns the wrong context. Invest in evaluating your retrieval separately before blaming the generation step.`,
    ],
    accent: 'amber',
    icon: '🔍',
  },
  {
    id: 'token-optimization',
    tag: 'Performance',
    title: 'Token Limits, Latency & Cost Optimization',
    body: [
      `Token economics hit me the first time I got an unexpectedly large API bill. Every token costs money and adds latency. Understanding and optimizing token usage became a first-class engineering concern.`,
      `Token counting: most APIs count tokens differently from word counts. A rough rule of thumb is 1 token ≈ 0.75 words in English. But code, JSON, and technical jargon tokenize differently — often less efficiently. I integrated tiktoken (OpenAI's tokenizer) into my pre-processing pipeline to measure prompt size before sending, enforce budgets, and trim when necessary.`,
      `Latency profiling revealed that TTFT (time-to-first-token) and throughput are distinct problems. TTFT is dominated by model size and infrastructure; there's limited control there. Throughput is where engineering decisions matter: request batching (group multiple small requests), response streaming (show partial results immediately), and caching (identical or near-identical prompts should not re-call the API).`,
      `Caching was the biggest win. I implemented a semantic cache: hash the embedding of the user query, look up recent responses for similar queries. If cosine similarity > 0.95, return the cached response. This cut API calls by ~35% in workloads with repetitive queries and reduced average latency significantly.`,
      `Model selection is a cost lever people underutilize. You don't need GPT-4 for every task. I built a routing layer: simple classification tasks go to GPT-3.5-turbo (or even a fine-tuned smaller model); complex reasoning goes to GPT-4. The cost difference is 10-20x. Routing intelligently can cut your monthly bill dramatically without sacrificing output quality where it matters.`,
      `Key finding: Token optimization is not premature optimization — it's a core engineering discipline in LLM applications. Cache aggressively, route intelligently, and measure your token consumption at every step.`,
    ],
    accent: 'orange',
    icon: '⚡',
  },
  {
    id: 'validation',
    tag: 'Reliability',
    title: 'Output Validation & Hallucination Reduction',
    body: [
      `This is the area that separates demos from production systems. LLMs are probabilistic — they generate plausible text, not necessarily correct text. Hallucination (confidently wrong output) is not a bug you can file — it's an inherent property of the technology that you must engineer around.`,
      `My first line of defense is structural validation. If I need JSON, I don't hope the model returns JSON — I specify the schema in the prompt, use function calling / structured outputs (where the API enforces the schema at generation time), and then validate the response against a schema on my end. Treat model output the same way you'd treat user input: never trust it directly.`,
      `Grounding is the best hallucination reducer. When the model is constrained to answer only from provided context (RAG context or injected documents), and you include an instruction like "If the answer is not in the provided context, say 'I don't know'", hallucination rates drop substantially. The model inventing facts usually happens when it has no ground truth to anchor to.`,
      `Self-consistency prompting is a technique I found effective for high-stakes outputs: generate the same response multiple times (with temperature > 0), then compare. If the model consistently produces the same answer across N generations, confidence is higher. If outputs diverge wildly, that's a signal to either reformulate the prompt or escalate to a human review.`,
      `Confidence scoring — asking the model to rate its own certainty — is unreliable on its own, but when combined with retrieval scores (how well the retrieved context matched the query) and output validation, it forms a useful signal for routing borderline cases to human review.`,
      `Key finding: Production LLM systems need a "trust but verify" architecture. Validate structure, ground outputs in retrieved facts, and build feedback loops so you can detect hallucination patterns in real traffic and improve prompts over time.`,
    ],
    accent: 'rose',
    icon: '🛡️',
  },
]

const ACCENT_CLASSES: Record<string, { border: string; tag: string; icon: string; heading: string }> = {
  indigo: { border: 'border-indigo-400 dark:border-indigo-500', tag: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300', icon: 'bg-indigo-100 dark:bg-indigo-900', heading: 'text-indigo-700 dark:text-indigo-300' },
  blue:   { border: 'border-blue-400 dark:border-blue-500',   tag: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',       icon: 'bg-blue-100 dark:bg-blue-900',   heading: 'text-blue-700 dark:text-blue-300' },
  violet: { border: 'border-violet-400 dark:border-violet-500', tag: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300', icon: 'bg-violet-100 dark:bg-violet-900', heading: 'text-violet-700 dark:text-violet-300' },
  emerald:{ border: 'border-emerald-400 dark:border-emerald-500', tag: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300', icon: 'bg-emerald-100 dark:bg-emerald-900', heading: 'text-emerald-700 dark:text-emerald-300' },
  amber:  { border: 'border-amber-400 dark:border-amber-500', tag: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',   icon: 'bg-amber-100 dark:bg-amber-900', heading: 'text-amber-700 dark:text-amber-300' },
  orange: { border: 'border-orange-400 dark:border-orange-500', tag: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300', icon: 'bg-orange-100 dark:bg-orange-900', heading: 'text-orange-700 dark:text-orange-300' },
  rose:   { border: 'border-rose-400 dark:border-rose-500',   tag: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',       icon: 'bg-rose-100 dark:bg-rose-900',   heading: 'text-rose-700 dark:text-rose-300' },
}

export default function LLMBlogPage() {
  const { go } = useNav()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => go('home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FiArrowLeft className="shrink-0" />
            Back to Portfolio
          </button>
          <nav className="hidden md:flex items-center gap-1 text-xs">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                {s.tag}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 mb-4">
            GenAI / LLM Engineering
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            What I Learned Building with LLMs:<br className="hidden md:block" /> A Java Engineer's Exploration of GenAI
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 max-w-3xl">
            Over the past year I went deep on GenAI and LLM engineering — not as a researcher, but as a practitioner integrating these tools into real systems. Here are my key findings on the concepts that matter most.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Amram Raju Madipalli</span>
            <span>·</span>
            <span>Java AI Engineer</span>
            <span>·</span>
            <span>March 2026</span>
            <span>·</span>
            <span>~15 min read</span>
          </div>
        </div>

        {/* Intro */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-10">
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            I came into GenAI engineering as a skeptic. I had six years of Java, Spring Boot, and distributed systems under my belt, and I wasn't convinced that "just call the API" constituted real engineering. I was wrong.
          </p>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            What I discovered is that building reliable, production-grade systems on top of LLMs requires the same discipline as any other complex infrastructure problem — plus a new set of abstractions that don't map cleanly to anything that came before. The probabilistic nature of model outputs, the economics of token consumption, the challenge of grounding responses in real data — these are genuinely hard engineering problems.
          </p>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            This post covers the seven core areas I explored: prompt engineering, API integration, summarization workflows, chunking strategies, RAG, token optimization, and hallucination reduction. For each, I'll share what I found when I actually built with it — not just read about it.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 mb-10">
          <p className="text-xs uppercase tracking-widest text-indigo-500 mb-3 font-semibold">In this article</p>
          <ol className="space-y-2">
            {SECTIONS.map((s, i) => {
              const ac = ACCENT_CLASSES[s.accent]
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 group hover:no-underline"
                  >
                    <span className="text-xs text-gray-400 dark:text-gray-500 w-4 shrink-0">{i + 1}.</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${ac.tag}`}>{s.tag}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{s.title}</span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Blog Sections */}
        <div className="space-y-10">
          {SECTIONS.map((s, i) => {
            const ac = ACCENT_CLASSES[s.accent]
            return (
              <article
                key={s.id}
                id={s.id}
                className={`scroll-mt-24 rounded-2xl border-l-4 ${ac.border} border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${ac.icon}`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ac.tag}`}>{s.tag}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">Part {i + 1} of {SECTIONS.length}</span>
                    </div>
                    <h2 className={`text-xl md:text-2xl font-bold leading-tight ${ac.heading}`}>{s.title}</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {s.body.map((para, pi) => {
                    const isKeyFinding = para.startsWith('Key finding:')
                    if (isKeyFinding) {
                      return (
                        <div key={pi} className={`rounded-xl p-4 border ${ac.border} bg-gray-50 dark:bg-gray-800`}>
                          <p className="text-sm leading-relaxed">
                            <span className="font-bold">Key finding: </span>
                            {para.replace('Key finding: ', '')}
                          </p>
                        </div>
                      )
                    }
                    return (
                      <p key={pi} className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {para}
                      </p>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>

        {/* Closing */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mt-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Closing Thoughts</h2>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            The patterns I've described — structured prompting, semantic chunking, RAG pipelines, semantic caching, output validation — are not theoretical. I've shipped all of them in one form or another, and they've meaningfully improved the reliability and cost profile of LLM-powered features.
          </p>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            If I had to name the single most important shift in mindset: stop thinking of the LLM as a magic oracle and start thinking of it as a capable but probabilistic component in a larger system. It needs guardrails, observability, fallback paths, and continuous evaluation — just like every other component in a production architecture.
          </p>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            The engineers who build the best GenAI systems won't be the ones who know the most about neural networks. They'll be the ones who treat LLM integration with the same rigor they bring to any other distributed systems problem.
          </p>
        </div>

        {/* Back to portfolio */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => go('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            <FiArrowLeft />
            Back to Portfolio
          </button>
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Amram Raju Madipalli · Java AI Engineer
        </div>
      </footer>
    </div>
  )
}
