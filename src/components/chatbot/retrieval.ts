import { KNOWLEDGE_BASE } from '../../data/knowledgeBase'

export function retrieveRelevantContext(question: string): string[] {
  const q = question.toLowerCase()

  return KNOWLEDGE_BASE
    .map((doc) => ({
      score: q.split(' ').filter((w) => doc.text.toLowerCase().includes(w)).length,
      text: doc.text,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((d) => d.text)
}
