import BlogLayout from '../components/layout/BlogLayout'

const NAV = [
  { id: 'problem', label: 'The Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'prompt-design', label: 'Prompt Design' },
  { id: 'results', label: 'Results' },
  { id: 'lessons', label: 'Lessons' },
]

export default function LLMIncidentBlogPage() {
  return (
    <BlogLayout
      tag="GenAI / LLM Engineering"
      title="Applying LLM Summarization to Real Production Incident Triage"
      subtitle="How I built a workflow at KPMG that transformed raw log floods into structured incident summaries — and what actually made it work in production."
      readTime="~10 min read"
      sections={NAV}
    >
      {/* Intro */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-10">
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          I've been on-call. I know the specific disorientation of being paged at 2am, opening a terminal, and staring at a wall of log output that contains the answer to "what is broken and why" somewhere inside it. The problem isn't that engineers can't read logs — it's that the first 20 minutes of any incident are spent on orientation, not investigation.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          This article is about the workflow I designed at KPMG to automate that orientation step using LLM summarization — what the architecture looks like, how the prompt engineering evolved, what the results were, and what I'd do differently now.
        </p>
      </div>

      {/* The Problem */}
      <article id="problem" className="scroll-mt-24 rounded-2xl border-l-4 border-red-400 dark:border-red-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-red-100 dark:bg-red-900 shrink-0">🚨</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">The Problem: Log Volume vs. Cognitive Bandwidth</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Modern distributed systems generate enormous volumes of logs. A single 5-minute incident window across a handful of services can produce tens of thousands of log lines. On-call engineers are expected to triage this in real time, under pressure, while also coordinating with stakeholders.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The specific failure pattern I observed: engineers would spend 15-20 minutes just building mental context — which service errored first, what the error cascade looked like, which downstream systems were affected, whether this pattern matched a known incident. Only after that could they start actually solving the problem.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Most of that orientation work is pattern recognition and summarization — two things LLMs are genuinely good at. The hypothesis was: can we automate the orientation step and give on-call engineers a structured starting point within 60 seconds of an alert firing?
        </p>
      </article>

      {/* Architecture */}
      <article id="architecture" className="scroll-mt-24 rounded-2xl border-l-4 border-indigo-400 dark:border-indigo-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-indigo-100 dark:bg-indigo-900 shrink-0">🏗️</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">The Architecture: Four Stages</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The workflow runs in four sequential stages, each with a focused responsibility.
        </p>
        <div className="space-y-4">
          {[
            {
              step: '1',
              name: 'Alert Trigger & Log Harvest',
              desc: 'An alerting rule fires (PagerDuty, CloudWatch, custom threshold). The trigger invokes a Spring Boot service that queries the log aggregation layer (ELK/Elasticsearch) for the time window surrounding the alert, scoped to the affected service(s). Raw log retrieval is bounded — we fetch the 500 most relevant log lines by severity and timestamp, not the entire stream.',
            },
            {
              step: '2',
              name: 'Normalization & Enrichment (Python)',
              desc: 'This is the stage most engineering blogs skip — and it\'s the most important one. Raw logs from different services have different formats, timestamp precisions, and severity taxonomies. A Python utility normalizes all logs to a unified schema: timestamp (ISO-8601), severity, service name, message, and a structured fields object. Noise is filtered (health check 200s, routine heartbeats). What remains is signal.',
            },
            {
              step: '3',
              name: 'Chunking & LLM Summarization',
              desc: 'Normalized logs are chunked to fit within the LLM\'s context window, with a small overlap between chunks. Each chunk is summarized independently (map phase). The chunk summaries are then combined into a final summary (reduce phase). This map-reduce approach scales to arbitrarily long log windows without exceeding token limits.',
            },
            {
              step: '4',
              name: 'Structured Output & Delivery',
              desc: 'The final summary is structured JSON: first error timestamp, affected component, error cascade sequence, suspected root cause, blast radius assessment, and suggested remediation steps. This is delivered to the on-call engineer via Slack with a formatted incident card before they\'ve finished reading the alert notification.',
            },
          ].map((s) => (
            <div key={s.step} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{s.step}</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{s.name}</p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Prompt Design */}
      <article id="prompt-design" className="scroll-mt-24 rounded-2xl border-l-4 border-violet-400 dark:border-violet-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-violet-100 dark:bg-violet-900 shrink-0">✍️</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">Prompt Design — Three Generations</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The prompt went through three major iterations before reaching the version that on-call engineers found genuinely useful.
        </p>
        <div className="space-y-5">
          {[
            {
              gen: 'Gen 1',
              label: 'Naive',
              color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
              desc: '"Summarize these logs." Results were verbose, unfocused, and in free text. Engineers had to read the summary almost as carefully as the original logs to extract the information they needed. Worse, the model sometimes hallucinated a root cause that wasn\'t evidenced in the logs.',
            },
            {
              gen: 'Gen 2',
              label: 'Structured',
              color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
              desc: 'Added explicit output structure requirements and chain-of-thought instructions: "First identify the earliest error. Then trace the downstream impact. Then hypothesize the root cause. Output as JSON with these fields: firstError, affectedComponents, cascadeSequence, suspectedCause, remediationSuggestions." Output quality improved dramatically. The chain-of-thought instruction forced the model to reason sequentially through the log timeline rather than jumping to a conclusion.',
            },
            {
              gen: 'Gen 3',
              label: 'Grounded',
              color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
              desc: 'Added grounding constraints: "Base your analysis only on the provided logs. If a field cannot be determined from the logs, set it to null with a note. Do not infer causes that are not evidenced in the log data." This eliminated hallucinated root causes. A null field with "not evidenced in provided logs" is far more useful to an engineer than a confident wrong answer.',
            },
          ].map((g) => (
            <div key={g.gen} className="flex gap-4">
              <div className={`px-2 py-1 rounded text-xs font-bold shrink-0 h-fit mt-1 ${g.color}`}>{g.gen}</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{g.label}</p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Results */}
      <article id="results" className="scroll-mt-24 rounded-2xl border-l-4 border-emerald-400 dark:border-emerald-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-emerald-100 dark:bg-emerald-900 shrink-0">📊</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">Results</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The workflow supported 10+ live production incidents. I tracked a few metrics informally across these.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          {[
            { metric: '~15 min', label: 'Average orientation time eliminated', sub: 'from first alert to structured context' },
            { metric: '10+', label: 'Live incidents supported', sub: 'across different failure types' },
            { metric: '~80%', label: 'Accuracy on root cause identification', sub: 'when evidenced in retrieved logs' },
          ].map((m) => (
            <div key={m.metric} className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{m.metric}</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{m.label}</p>
              <p className="text-xs text-gray-400">{m.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          The qualitative feedback from engineers was more telling than any metric. The consistent comment was that the structured summary gave them a starting hypothesis to test rather than a blank slate to fill. That shift — from "figure out what happened" to "verify whether this hypothesis is correct" — is cognitively much lighter and faster.
        </p>
      </article>

      {/* Lessons */}
      <article id="lessons" className="scroll-mt-24 rounded-2xl border-l-4 border-blue-400 dark:border-blue-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-blue-100 dark:bg-blue-900 shrink-0">💡</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">Lessons for Anyone Building Similar Systems</h2>
        </div>
        <div className="space-y-4">
          {[
            { title: 'Normalization is the most important stage', body: 'The LLM cannot compensate for noisy, inconsistent input. Invest in your ingestion and normalization layer before touching prompt engineering.' },
            { title: 'Grounding constraints eliminate hallucination', body: 'Telling the model to only use what\'s in the provided context, and to return null when evidence is absent, is more effective than any other hallucination mitigation technique I tried.' },
            { title: 'Map-reduce scales naturally', body: 'For long time windows, the map-reduce summarization pattern is robust and simple. Chunk summaries are cheaper per-token and the reduce step produces a coherent final output.' },
            { title: 'The success metric is engineer trust', body: 'If engineers stop reading the summary and just act on it, you\'ve overfit to their trust. If they ignore it, you\'ve failed to earn it. The right outcome is that they read it as the first thing and verify the key claim before acting.' },
          ].map((l) => (
            <div key={l.title} className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2.5" />
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-0.5">{l.title}</p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </BlogLayout>
  )
}
