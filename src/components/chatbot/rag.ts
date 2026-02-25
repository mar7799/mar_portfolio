import { retrieveRelevantContext } from './retrieval'

export function buildRagAnswer(question: string): string {
  const context = retrieveRelevantContext(question)

  if (!context.length) {
    return 'I could not find relevant information in Amram’s resume.'
  }

  return `
Based on Amram’s experience:

${context.join('\n')}

Question: ${question}
  `.trim()
}
