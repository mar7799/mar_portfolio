import { FiGithub } from 'react-icons/fi'
import BlogLayout from '../components/layout/BlogLayout'

const NAV = [
  { id: 'incident-triage', label: 'GenAI Triage' },
  { id: 'workflow-platform', label: 'Workflow Platform' },
  { id: 'release-automation', label: 'CI/CD Automation' },
  { id: 'rag-pipeline', label: 'RAG Pipeline' },
  { id: 'computer-vision', label: 'Computer Vision' },
]

export default function ProjectsBlogPage() {
  return (
    <BlogLayout
      tag="Projects & Engineering"
      title="Five Projects That Shaped How I Think About Engineering"
      subtitle="A candid look at the work behind the resume — what each project actually taught me, what was harder than expected, and what I'd do differently."
      readTime="~12 min read"
      sections={NAV}
    >
      {/* Intro */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-10">
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Resumes compress projects into bullet points optimized for skimmability. What they can't capture is the reasoning behind the decisions, what didn't work the first time, or what the project actually taught you beyond the technology stack.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          This is the longer version. Five projects from my career and graduate work — what they were, how they evolved, and what I genuinely learned from each.
        </p>
      </div>

      {/* Project 1 — GenAI Incident Triage */}
      <article id="incident-triage" className="scroll-mt-24 rounded-2xl border-l-4 border-indigo-400 dark:border-indigo-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-indigo-100 dark:bg-indigo-900 shrink-0">🚨</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">KPMG · 2024–Present</span>
              <span className="text-xs text-gray-400">Java 17, Spring Boot, Python, LLM APIs</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">GenAI Incident Triage Accelerator</h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The problem that launched this project was mundane: on-call engineers at 2am, staring at hundreds of log lines across multiple services, trying to determine whether a spike in error rate was a real outage or a flaky health check. The first 20 minutes of any incident were almost always the same — gather context, correlate logs, form a hypothesis. None of that required deep expertise. It just required reading.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          I designed a workflow that automated that first 20 minutes. When an alert fired, a Java Spring Boot service pulled the relevant logs, normalized them (stripping noise, unifying timestamps, grouping by service), and passed structured chunks to an LLM API with a prompt engineered for incident analysis: "Given these log traces, identify the first error, the affected component, the blast radius, and suggest a remediation path."
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The hardest part wasn't the LLM call — it was log normalization. Production logs from different services have different formats, different severity levels, and wildly different verbosity. I wrote Python utilities for log ingestion and normalization that did heavy lifting before the LLM ever saw the data. Garbage in, garbage out is more true with LLMs than almost anywhere else.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The workflow supported 10+ live incidents. The most valuable outcome wasn't accuracy of the suggestions (though it was good) — it was cognitive load reduction. Engineers could start making decisions in minutes instead of spending the first quarter-hour just orienting themselves to the data.
        </p>
        <div className="rounded-xl p-4 border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">What I learned: </span>
            AI features live or die on data quality before the model. Invest in your ingestion and normalization layer at least as much as the prompt. Also: the first thing on-call engineers thanked us for wasn't the AI output — it was having a consistent, structured incident summary instead of scanning raw logs.
          </p>
        </div>
      </article>

      {/* Project 2 — Enterprise Workflow Platform */}
      <article id="workflow-platform" className="scroll-mt-24 rounded-2xl border-l-4 border-blue-400 dark:border-blue-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-blue-100 dark:bg-blue-900 shrink-0">🏗️</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">KPMG · 2024–Present</span>
              <span className="text-xs text-gray-400">Java 17, Spring Boot, Node.js, GraphQL, Hibernate, Oracle, MySQL</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Enterprise Workflow Service Platform</h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          This is the project that most closely resembles "normal" enterprise backend engineering — and that normality hides a lot of interesting engineering challenges. The platform powers API-driven business workflows for internal and client-facing teams: multi-step approval processes, data validation pipelines, audit-tracked operations across departments.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The most interesting technical challenge was GraphQL adoption. The frontend teams had complex, evolving data requirements — they needed to compose data from multiple entities (users, workflows, approvals, attachments) with varying field sets depending on the UI context. A REST API would have required multiple round trips or a proliferation of specialized endpoints. GraphQL let us define a rich schema once and let clients compose exactly what they needed.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The N+1 query problem hit us almost immediately. A query for 50 workflows that also fetched each workflow's latest approver was hitting the database 51 times — once for the workflows, once per row for the approver. DataLoader-style batching solved it: collect all approver IDs from the resolved workflow list, fetch them in a single query, then map them back. P95 latency on that query dropped from ~800ms to ~120ms.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The security layer was another significant piece. Role-based access control at the GraphQL resolver level — not just the HTTP layer — was necessary because different roles could query the same types but see different fields. A manager sees full workflow history; an analyst sees current state only. Implementing field-level authorization cleanly in a GraphQL schema required careful design upfront; it's much harder to retrofit.
        </p>
        <div className="rounded-xl p-4 border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">What I learned: </span>
            GraphQL gives real flexibility to frontend teams, but you must invest in DataLoader batching from day one — the N+1 problem will appear the moment queries have nested lists. Also, field-level authorization in GraphQL is not a GraphQL problem; it's a domain modeling problem that GraphQL just makes explicit.
          </p>
        </div>
      </article>

      {/* Project 3 — Cloud Release Automation */}
      <article id="release-automation" className="scroll-mt-24 rounded-2xl border-l-4 border-emerald-400 dark:border-emerald-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-emerald-100 dark:bg-emerald-900 shrink-0">🚀</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">Accenture / KPMG · 2019–2024</span>
              <span className="text-xs text-gray-400">Maven, Jenkins, Docker, Kubernetes, GitHub Actions, AWS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Cloud Release & Quality Automation</h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          This isn't a single project — it's a discipline I built over five years. The transformation from "releases are scary and manual" to "releases are boring and automated" is one of the most valuable engineering investments I've made, and it happened incrementally.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          At Accenture the starting point was Maven-based builds with a Jenkins pipeline that had grown organically over years — fragile, undocumented, with environment-specific hacks baked into shell scripts. The first improvement wasn't adding new features; it was removing the hacks and making the pipeline deterministic. A build that passes on my machine and fails on CI is not a build.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Introducing automated test quality gates was the most impactful change. Before: releases required a manual QA sign-off day before each deploy. After: any PR that broke unit tests, integration tests, or a regression suite didn't get merged — the CI pipeline rejected it. The feedback loop went from days to minutes. Developers caught regressions immediately instead of discovering them in QA.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Moving to GitHub Actions from Jenkins was a later change — partly for the declarative YAML over Groovy, partly for the tight Git integration, partly for the marketplace of reusable actions. Containerizing builds (running in Docker so the build environment is reproducible) was the other major step. No more "works on my Jenkins agent" problems.
        </p>
        <div className="rounded-xl p-4 border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">What I learned: </span>
            The ROI on CI/CD investment is enormous and delayed — it pays out across every future deployment. Start with making builds deterministic, then add quality gates, then automate deployment. Doing it in that order means each step is built on a solid foundation.
          </p>
        </div>
      </article>

      {/* Project 4 — RAG Pipeline */}
      <article id="rag-pipeline" className="scroll-mt-24 rounded-2xl border-l-4 border-amber-400 dark:border-amber-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-amber-100 dark:bg-amber-900 shrink-0">🔍</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">Graduate Research</span>
              <span className="text-xs text-gray-400">Python, Vector Databases, LLM APIs, Cosine Similarity</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">RAG Data Pipelines — From Dataset to Grounded Answers</h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          During my graduate program I implemented a Retrieval-Augmented Generation pipeline end-to-end — from raw dataset to a system that could answer questions grounded in that data. This was the project that made LLMs feel genuinely useful for real applications to me.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The ingestion pipeline: load documents, clean and normalize text, split into overlapping chunks (preserving sentence boundaries, 10-15% overlap between chunks), generate embeddings for each chunk using an embedding model, and store vectors in a vector index. The retrieval pipeline: take a user question, embed it, find the top-K chunks by cosine similarity, inject those chunks into a prompt, generate an answer.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          What surprised me most was how chunk quality dominated answer quality. My first implementation used fixed-size character splits. The answers were bad — not because the LLM was bad, but because the retrieved context was incoherent (sentences cut mid-thought, context split across boundaries). Switching to sentence-boundary chunking with overlap improved answer relevance significantly, without changing the model or prompt at all.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          I also tested how chunk size affected retrieval. Smaller chunks (150-200 tokens) had more precise retrieval but sometimes missed context that spanned multiple chunks. Larger chunks (400-500 tokens) captured more context per chunk but retrieved broader, noisier results. The sweet spot for my dataset was around 300 tokens with 50-token overlap.
        </p>
        <div className="rounded-xl p-4 border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">What I learned: </span>
            Evaluate your retrieval step independently from your generation step. If the wrong context is being retrieved, improving the prompt or swapping models won't help. Chunk quality and embedding choice are the most impactful levers in a RAG system.
          </p>
        </div>
      </article>

      {/* Project 5 — Computer Vision */}
      <article id="computer-vision" className="scroll-mt-24 rounded-2xl border-l-4 border-violet-400 dark:border-violet-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-violet-100 dark:bg-violet-900 shrink-0">👁️</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">Graduate Research</span>
              <span className="text-xs text-gray-400">VGG16, Transfer Learning, Python, PyTorch</span>
              <a
                href="https://github.com/mar7799/Machine-Learning-Models"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-600 transition-colors"
              >
                <FiGithub size={12} />
                View on GitHub
              </a>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Computer Vision PoC — Fake vs Real Image Detection with VGG16</h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          This was my first hands-on experience with transfer learning, and it shifted my mental model of how deep learning actually works in practice. The task was binary classification: given an image, is it a real photograph or synthetically generated?
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          I chose VGG16 — a convolutional neural network pre-trained on ImageNet — as the base. The intuition behind transfer learning: VGG16 already knows how to detect edges, textures, shapes, and visual patterns from its training on millions of images. For my task I only needed to fine-tune the final classification layers to distinguish the specific visual artifacts that appear in synthetic images.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Dataset preparation was 70% of the work. The classes were imbalanced — far more "real" images than synthetic ones in the available datasets. I addressed this with oversampling the minority class, data augmentation on the synthetic images (rotation, flip, brightness variation), and class-weighted loss during training. Getting the class balance right mattered more than most hyperparameter tuning.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The evaluation stage was the most revealing. High accuracy on the test set masked interesting failure modes: the model was confident and wrong on images where the synthetic generation was very high quality. Precision-recall analysis and looking at the confusion matrix across difficulty tiers gave a more honest picture of where the model was actually reliable.
        </p>
        <div className="rounded-xl p-4 border border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">What I learned: </span>
            Accuracy is a deceptive metric. Look at your model's failure modes, not just its success rate. Class imbalance will silently ruin your model unless you address it explicitly. Transfer learning makes deep learning practical for small-to-medium datasets — don't train from scratch when you don't have to.
          </p>
        </div>
      </article>

      {/* Closing */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">What the Projects Have in Common</h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Looking back at all five, the pattern I notice is that the interesting problems were never in the technology. The GenAI triage project's hard problem was log normalization, not LLM prompting. The workflow platform's hard problem was field-level authorization, not GraphQL syntax. The RAG pipeline's hard problem was chunk quality, not vector search.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          The technology layer is learnable. The harder skill is correctly identifying which layer is actually causing the problem — and having the patience to fix that before reaching for a fancier tool.
        </p>
      </div>
    </BlogLayout>
  )
}
