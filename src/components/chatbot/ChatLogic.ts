import { buildRagAnswer } from './rag'

export function getBotReply(question: string): string {
  return buildRagAnswer(question)
}


// export default function getBotReply(question: string): string {
//   const q = question.toLowerCase()

//   if (q.includes('experience')) {
//     return 'Amram has 6+ years of experience building Java, Spring Boot, and React applications, including enterprise-scale systems.'
//   }

//   if (q.includes('project') || q.includes('inventory')) {
//     return 'He led an inventory microservices platform using Spring Boot, Kafka, MongoDB, and AWS ECS handling 10k+ daily transactions.'
//   }

//   if (q.includes('aws') || q.includes('cloud')) {
//     return 'Yes — he has hands-on experience with AWS ECS, Lambda, S3, RDS, and CI/CD using GitHub Actions.'
//   }

//   if (q.includes('contact')) {
//     return 'You can reach Amram via email at rajuamram99@gmail.com or LinkedIn.'
//   }

//   return 'Good question 🙂 You can ask me about experience, projects, AWS, or how to contact Amram.'
// }
