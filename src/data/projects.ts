export const PROJECTS = [
  {
    name: 'Inventory Management Microservices Platform',
    year: '2023',
    role: 'Lead Developer',
    stack: 'Java 17, Spring Boot, Kafka, MongoDB, React, Docker, AWS ECS, ELK Stack',
    bullets: [
      'Architected 5+ microservices handling 10k+ daily transactions.',
      'Centralized logging with ELK; MTTR reduced by ~40%.',
      'Resilience4j-based fault tolerance; uptime improved to 99.9%.',
    ],
  },
  {
    name: 'Banking Customer Onboarding Portal',
    year: '2022',
    role: 'Full-Stack Developer',
    stack: 'Java 11, Spring Boot, React, PostgreSQL, Docker, AWS Lambda',
    bullets: ['OAuth2 + JWT auth; secure onboarding flows.', 'Integrated KYC APIs; manual verification time cut by ~60%.', 'Containerized and deployed on AWS ECS.'],
  },
  {
    name: 'E-commerce Order Tracking Dashboard',
    year: '2021',
    role: 'Backend Developer',
    stack: 'Java 8, Spring MVC, MySQL, AngularJS, Jenkins',
    bullets: ['Realtime order tracking REST APIs.', 'Query tuning + caching dropped p95 from 2s → 200ms.'],
  },
]