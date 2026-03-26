import type { Page } from '../context/nav'

export type Blog = {
  title: string
  description?: string
  page?: Page
  tag?: string
}

export const BLOGS: Blog[] = [
  {
    title: "What I Learned Building with LLMs: A Java Engineer's Exploration of GenAI",
    description: 'Prompt engineering, RAG, chunking, token optimization, hallucination reduction — key findings from real implementations.',
    page: 'llm-blog',
    tag: 'GenAI / LLM Engineering',
  },
  {
    title: 'System Design From the Trenches: What I\'ve Actually Learned',
    description: 'Scalability, caching, databases, microservices, messaging, resilience, observability, and CAP theorem — from production experience, not a whiteboard.',
    page: 'system-design-blog',
    tag: 'System Design',
  },
  {
    title: 'Five Projects That Shaped How I Think About Engineering',
    description: 'A candid look at the work behind the resume — the GenAI triage accelerator, GraphQL workflow platform, CI/CD automation, RAG pipeline, and computer vision PoC.',
    page: 'projects-blog',
    tag: 'Projects & Engineering',
  },
  {
    title: 'Applying LLM Summarization to Real Production Incident Triage',
    description: 'How a four-stage AI workflow transformed raw log floods into structured incident summaries at KPMG — architecture, prompt design, and lessons learned.',
    page: 'llm-incident-blog',
    tag: 'AI Workflows',
  },
  {
    title: 'Designing Hybrid Java + Python Service Architectures for Enterprise AI',
    description: 'Bridging Java microservices with Python AI inference layers — communication patterns, type safety at language boundaries, and deployment considerations.',
    page: 'java-python-arch-blog',
    tag: 'Architecture',
  },
  {
    title: 'Improving Reliability with CI Quality Gates, SQL Tuning, and Observability',
    description: 'Three practical disciplines that transformed release confidence and production stability across five years of enterprise engineering.',
    page: 'reliability-blog',
    tag: 'DevOps & Reliability',
  },
]
