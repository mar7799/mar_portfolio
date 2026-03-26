import BlogLayout from '../components/layout/BlogLayout'

const NAV_SECTIONS = [
  { id: 'scalability', label: 'Scalability' },
  { id: 'load-balancing', label: 'Load Balancing' },
  { id: 'caching', label: 'Caching' },
  { id: 'databases', label: 'Databases' },
  { id: 'microservices', label: 'Microservices' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'api-design', label: 'API Design' },
  { id: 'resilience', label: 'Resilience' },
  { id: 'observability', label: 'Observability' },
  { id: 'cap', label: 'CAP Theorem' },
]

interface Article {
  id: string
  emoji: string
  tag: string
  title: string
  accent: string
  body: string[]
}

const ARTICLES: Article[] = [
  {
    id: 'scalability',
    emoji: '📈',
    tag: 'Foundation',
    title: 'Scalability — Horizontal vs Vertical and Why It Actually Matters',
    accent: 'indigo',
    body: [
      `Scalability was the first system design concept I had to wrestle with in a real codebase — not a textbook. At KPMG, a backend service that handled fine under QA load started cracking under production concurrency. That was my introduction to the difference between "works" and "scales".`,
      `Vertical scaling — giving your server more CPU and RAM — is the path of least resistance. It's fast to apply, requires no architectural change, and has no coordination overhead. But it hits a physical ceiling quickly, and more importantly, it creates a single point of failure. If that one beefy machine goes down, everything goes with it.`,
      `Horizontal scaling — adding more machines and distributing load across them — is harder to set up but far more powerful. It requires your application to be stateless (session data must live externally in a cache or DB, not in server memory), and you need a load balancer in front. But the ceiling is essentially unlimited, and you gain resilience: if one instance dies, the others absorb traffic.`,
      `The practical lesson I learned: design stateless services from day one. Storing user sessions in server memory feels convenient early on but becomes a scalability trap the moment you try to run two instances. Use Redis or a shared cache for anything session-related, and your service becomes horizontally scalable almost for free.`,
      `Key finding: Vertical scaling buys time; horizontal scaling buys future. Design stateless services early — retrofitting statefulness out of a system is one of the most painful refactors you'll do.`,
    ],
  },
  {
    id: 'load-balancing',
    emoji: '⚖️',
    tag: 'Traffic',
    title: 'Load Balancing — More Than Round Robin',
    accent: 'blue',
    body: [
      `When I first heard "load balancer," I imagined a simple traffic cop directing requests to servers in rotation. That mental model is roughly correct for the simplest case, but the nuance in load balancing strategy has a real impact on both performance and reliability.`,
      `Round-robin is the baseline: requests go to servers in order, cycling through the pool. It's simple and works well when all requests are roughly equal in cost. But in practice, some requests are much heavier — a long-running report generation versus a lightweight health check. Round-robin distributes requests equally, not work equally.`,
      `Least-connections routing is smarter for unequal workloads: route each new request to the server currently handling the fewest active connections. This keeps heavy requests from piling onto already-busy servers. I've seen this make a significant difference in systems with mixed workload types.`,
      `Sticky sessions (session affinity) are a load balancing feature that routes a given user's requests to the same server. This is useful when you haven't achieved full statelesness — but it's a workaround, not a solution. Sticky sessions reduce load balancing effectiveness and complicate deployment (you can't drain one server without impacting its sticky users). Prefer eliminating the need for sticky sessions.`,
      `Health checks are what make load balancing safe. A load balancer that routes traffic to a crashed server is worse than no load balancer. Active health checks (the balancer periodically probes each backend) and passive health checks (the balancer watches for failures in live traffic) both matter. I've configured both in AWS ALB with custom health check paths that validate not just that the process is up, but that it can reach the database.`,
      `Key finding: Round-robin is a starting point, not a strategy. Match your balancing algorithm to your workload shape, and invest in health checks — a load balancer without them is a liability.`,
    ],
  },
  {
    id: 'caching',
    emoji: '⚡',
    tag: 'Performance',
    title: 'Caching — The Fastest Data Is Data You Don\'t Fetch',
    accent: 'violet',
    body: [
      `Caching is the most immediately impactful performance optimization I've applied. At Accenture, I had a reporting query that ran every 30 seconds per user and took 2–3 seconds each time against a legacy Oracle database. Caching the result for 60 seconds eliminated 95% of those database hits instantly.`,
      `There are multiple cache layers to know. Browser/CDN caching sits closest to the user and handles static assets — HTML, JS bundles, images. Application-level caching (in-process, like Caffeine in Java) is fast but not shared across instances — it works only for data that's the same regardless of which instance serves the request. Distributed caching (Redis, Memcached) is shared across all instances and is the right tool for user session data, computed results, and frequently-read database records.`,
      `Cache invalidation is famously hard — it's half of the two hard problems in computer science. I've settled on a few patterns: TTL-based expiry (simplest, slight staleness acceptable), write-through (update cache and DB together), and cache-aside (read from cache; on miss, load from DB, populate cache). Cache-aside is the most common pattern I use; it's explicit and gives you full control.`,
      `Cache stampedes — also called thundering herd — happen when a popular cached item expires and many simultaneous requests all hit the database at once before any of them can re-populate the cache. I've handled this with probabilistic early expiry (start refreshing before the item expires, probabilistically) and mutex locks on cache misses (only one request fetches from DB while others wait).`,
      `In my GenAI work I applied semantic caching — caching LLM responses keyed by the semantic similarity of the input query, not just an exact match. Two questions that mean the same thing should return the cached answer. This cut API calls significantly for repetitive query patterns.`,
      `Key finding: Cache at the right layer for your access pattern. Distributed caching with cache-aside is the most flexible starting point. Always plan for invalidation and stampede protection before your cache goes to production.`,
    ],
  },
  {
    id: 'databases',
    emoji: '🗄️',
    tag: 'Storage',
    title: 'Database Design — SQL, NoSQL, Sharding & Replication',
    accent: 'emerald',
    body: [
      `I've worked with Oracle, MySQL, PostgreSQL, MongoDB, and DynamoDB across my career, and the most valuable thing I've learned is that "SQL vs NoSQL" is the wrong question. The right question is: what are the access patterns?`,
      `Relational databases (SQL) shine when your data has complex relationships, you need strong consistency, and your query patterns are flexible — ad hoc reporting, joins, aggregations. They enforce schema, which is a constraint that pays dividends in data integrity over time. At Accenture, the financial data I worked with had rich relational structure — accounts, transactions, customers, products — that would have been painful to model in a document store.`,
      `NoSQL databases trade some of that flexibility for scale and schema agility. Document stores like MongoDB are ideal when your data is naturally hierarchical, your access is almost always by a primary key, and your schema evolves frequently. DynamoDB excels for extremely high-throughput, low-latency key-value access at massive scale — but you must know your access patterns in advance because the data model is designed around them.`,
      `Sharding is horizontal partitioning: splitting data across multiple database nodes based on a partition key. This scales write throughput beyond what a single node can handle. The tricky part is choosing the right partition key — one with even distribution and minimal cross-shard queries. A poor partition key creates "hot" shards that become bottlenecks, which is worse than not sharding at all.`,
      `Replication is copying data from a primary node to one or more replicas. Read replicas offload read traffic from the primary and improve availability. But replication lag means replicas may serve slightly stale data — this matters for read-after-write consistency. I've had to be explicit in application code about when to read from primary vs replica.`,
      `Key finding: Choose your database based on access patterns, not hype. Master SQL tuning (query plans, indexes, explain analyze) before reaching for NoSQL — many "NoSQL is needed" situations are actually "the SQL is unoptimized" situations.`,
    ],
  },
  {
    id: 'microservices',
    emoji: '🧩',
    tag: 'Architecture',
    title: 'Microservices — What I Wish I Knew Before Building Them',
    accent: 'amber',
    body: [
      `I've built microservices and I've maintained monoliths, and the honest answer is: both have their place. Microservices are not inherently better — they're a tradeoff that makes sense at a certain scale and team size. Choosing microservices before you've outgrown a monolith adds operational complexity without proportional benefit.`,
      `When microservices do make sense, the most important architectural decision is service boundary definition. Services should map to bounded contexts — coherent business domains with clear ownership. The anti-pattern is slicing services too fine (nano-services) where simple operations require cascading calls across five services, or too coarse where you've just built a distributed monolith.`,
      `Service-to-service communication has two main flavors: synchronous (REST, GraphQL, gRPC) and asynchronous (message queues). Synchronous is simpler to reason about but creates tight coupling — if service B is down, service A fails too. Asynchronous decouples failure: service A publishes an event and moves on; service B processes it when it's ready. I've used Kafka for high-throughput async pipelines at KPMG and preferred it for anything that could tolerate eventual consistency.`,
      `Data ownership is a core microservices discipline: each service owns its data and no other service accesses its database directly. This is painful to enforce but essential. Shared databases between microservices eliminate the independence that makes microservices valuable — you can't deploy service A and service B independently if they share a schema.`,
      `Distributed transactions — when an operation spans multiple services — are the hardest part. Two-phase commit is heavy and creates coupling. The Saga pattern is lighter: a sequence of local transactions, each publishing an event. If one step fails, compensating transactions undo the earlier steps. I've implemented simple sagas and they require discipline to keep the compensating logic correct.`,
      `Key finding: Start with a modular monolith and extract microservices when team or scale demands it. When you do go micro, defend service boundaries and data ownership zealously — they're what make the architecture work.`,
    ],
  },
  {
    id: 'messaging',
    emoji: '📨',
    tag: 'Async',
    title: 'Message Queues & Event-Driven Architecture',
    accent: 'orange',
    body: [
      `Message queues changed how I think about service integration. The shift from "service A calls service B" to "service A publishes an event that service B (and possibly C, D) reacts to" is architectural — it changes coupling, failure modes, and scalability all at once.`,
      `I've used Kafka and AWS SQS/SNS in production. Kafka is a distributed log: messages are retained for a configurable period, consumers track their own offsets, and multiple consumer groups can independently process the same stream. This is powerful for event sourcing, audit trails, and replay scenarios. SQS is simpler — a traditional queue where each message is consumed once, with visibility timeout and dead-letter queue built in. I reach for SQS when simplicity matters and Kafka when I need fan-out, replay, or high throughput.`,
      `Dead-letter queues (DLQs) are non-negotiable in any message-driven system. When a consumer fails to process a message after N retries, the message goes to the DLQ instead of being lost or causing an infinite retry loop. I monitor DLQ depth as a reliability signal — a growing DLQ is a sign of a bug or data quality issue that needs attention.`,
      `Event-driven architecture introduces eventual consistency: when service A publishes an event, service B may not have processed it yet. This is fine for many use cases, but you must be explicit about where the system is eventually consistent and where strong consistency is required. Getting this wrong leads to bugs that only show up under concurrency.`,
      `At KPMG, I used event-driven patterns for the incident triage workflow: a log ingestion event triggers enrichment, which triggers LLM summarization, which triggers notification. Each step is independent, failures are isolated, and the whole pipeline is observable through event streams.`,
      `Key finding: Message queues decouple failure, smooth traffic spikes, and enable fan-out naturally. Always wire up dead-letter queues and monitor them. Be explicit about where your system is eventually consistent.`,
    ],
  },
  {
    id: 'api-design',
    emoji: '🔗',
    tag: 'APIs',
    title: 'API Design — REST, GraphQL & the Real Tradeoffs',
    accent: 'rose',
    body: [
      `I've designed REST APIs and GraphQL APIs in production, and the "which is better" debate misses the point. They solve different problems. Understanding where each shines saved me from unnecessary complexity.`,
      `REST is predictable and tool-friendly. Resources are nouns, HTTP verbs communicate intent (GET reads, POST creates, PUT replaces, PATCH modifies, DELETE removes), and status codes communicate outcomes. Every HTTP client, load balancer, CDN, and monitoring tool understands REST natively. I default to REST and only reach for something else when I have a specific reason.`,
      `The weakness of REST is over- and under-fetching. A client might need data from three resources, requiring three round trips (under-fetching). Or a resource endpoint returns 50 fields when the client needs 5 (over-fetching). Both waste bandwidth and add latency.`,
      `GraphQL solves exactly this. Clients declare precisely what data they need in a query, and the server returns exactly that — no more, no less. This is powerful for frontend teams who can evolve their data needs without coordinating with the backend on every change. At KPMG, I implemented GraphQL for client-facing workflow APIs where the frontend had complex, evolving data requirements across multiple entities.`,
      `But GraphQL has real costs: N+1 query problems (naive resolvers hit the database once per item in a list — you need DataLoader-style batching), complex caching (REST has URL-based caching for free; GraphQL needs thoughtful cache key design), and steeper debugging overhead.`,
      `Good API design principles I apply regardless of style: version your APIs (don't break existing clients), use meaningful error responses with error codes and messages (not just HTTP status), document with OpenAPI/GraphQL introspection, and treat the API contract as a public promise — don't change it without a deprecation path.`,
      `Key finding: REST is the right default. Adopt GraphQL when clients have highly variable, evolving data needs and you can invest in proper resolver optimization. Don't let tooling hype drive the choice.`,
    ],
  },
  {
    id: 'resilience',
    emoji: '🛡️',
    tag: 'Reliability',
    title: 'Resilience — Rate Limiting, Circuit Breakers & Graceful Degradation',
    accent: 'teal',
    body: [
      `A system that works under normal conditions but falls apart under load or dependency failures is not production-ready. Resilience engineering is about designing for the failure scenarios you hope never happen but know eventually will.`,
      `Rate limiting protects your service from being overwhelmed — by traffic spikes, misbehaving clients, or intentional abuse. I implement rate limiting at multiple layers: at the API gateway (global per IP or API key), and within the application for expensive operations. Token bucket and sliding window algorithms are the standard approaches. The key is to return a meaningful 429 response with a Retry-After header, not just drop requests silently.`,
      `Circuit breakers (I've used Resilience4j in Java extensively) prevent cascading failures. When a downstream dependency starts failing, the circuit breaker "opens" and subsequent calls fail fast rather than hanging until timeout. After a configured window, the circuit enters half-open state and allows a probe request through. If it succeeds, the circuit closes. This pattern saved us during a database degradation event — the circuit opened, our fallback behavior kicked in, and the UI stayed functional with a graceful degradation message instead of timing out for every user.`,
      `Timeouts are the most underrated resilience tool. Every external call — database, API, message broker — must have a timeout configured. Without it, a slow dependency will eventually exhaust your thread pool as requests pile up waiting. I set timeouts at the HTTP client level, the database connection level, and the Resilience4j level.`,
      `Graceful degradation means the system continues to function in a reduced capacity when something fails. Serve cached data when the database is slow. Show a "service temporarily unavailable" message for non-critical features while core functionality stays up. Design the happy path and the degraded path with equal intentionality.`,
      `Key finding: Add circuit breakers, timeouts, and rate limiting before you need them, not after an incident. Resilience4j in Java makes this low-ceremony. The cost of adding these is hours; the cost of not having them is measured in outage duration.`,
    ],
  },
  {
    id: 'observability',
    emoji: '🔭',
    tag: 'Operations',
    title: 'Observability — Logs, Metrics & Traces',
    accent: 'cyan',
    body: [
      `Observability is what separates a system you can operate from one you can only hope works. I came to appreciate this deeply during incident response at KPMG — the difference between a well-instrumented service and an opaque one is the difference between a 20-minute resolution and a 3-hour war room.`,
      `Logs are the narrative. Structured logs (JSON with fields rather than free-text strings) are searchable and filterable in ways that human-readable logs are not. I always log a correlation/trace ID on every request and propagate it through downstream calls — this lets you search for a single request across every service it touched. At KPMG I used the ELK stack (Elasticsearch, Logstash, Kibana) for log aggregation and analysis; the Kibana dashboards made pattern recognition across thousands of log events tractable.`,
      `Metrics are the heartbeat. They tell you what the system is doing in aggregate: request rate, error rate, latency percentiles (p50, p95, p99), queue depth, cache hit rate. I instrument with Prometheus and Micrometer in Java Spring Boot apps — annotations on methods to record timings, custom gauges for business metrics. Alerting on p99 latency and error rate thresholds gives early warning before users notice degradation.`,
      `Distributed tracing fills the gap between logs and metrics: it shows the full call chain of a single request across services, with timing for each hop. OpenTelemetry is the standard now. A flame graph view of a slow request trace instantly reveals which service or database call is the bottleneck — something that logs alone can't easily show.`,
      `The three together — logs, metrics, traces — form the observability triangle. I've found that starting with structured logs and meaningful error rate metrics gives 80% of the value. Add distributed tracing once your service boundary complexity makes request flow hard to reason about from logs alone.`,
      `Key finding: Instrument from day one. Retrofit observability is painful and often incomplete. Structured logs with correlation IDs, error rate / latency metrics, and at least basic distributed tracing will pay dividends in every incident you ever respond to.`,
    ],
  },
  {
    id: 'cap',
    emoji: '⚗️',
    tag: 'Theory',
    title: 'CAP Theorem — And Why It\'s More Practical Than It Sounds',
    accent: 'indigo',
    body: [
      `The CAP theorem states that a distributed system can guarantee at most two of three properties: Consistency (every read sees the most recent write), Availability (every request gets a response), and Partition Tolerance (the system continues operating despite network partitions). Since network partitions in distributed systems are not a matter of "if" but "when," you're really choosing between Consistency and Availability.`,
      `CP systems (consistent and partition-tolerant) choose correctness over availability. When a partition occurs, they refuse to serve requests they can't guarantee are consistent. Traditional relational databases with strong consistency guarantees fall here. This is the right choice for financial systems — I'd rather a transaction fail cleanly than produce incorrect balance data.`,
      `AP systems (available and partition-tolerant) choose uptime over perfect consistency. When a partition occurs, they continue serving requests, accepting that different nodes may have slightly different views of the data. This is eventual consistency — the system will converge to a consistent state once the partition heals. DynamoDB, Cassandra, and CouchDB are AP systems. This is appropriate for product catalog data, social media feeds, or any use case where serving slightly stale data is better than being unavailable.`,
      `In practice I've found CAP most useful as a forcing function for explicit conversations about consistency requirements. When designing a new service I ask: what's the business impact of serving stale data? What's the business impact of being unavailable? The answers drive the data store and replication strategy choices.`,
      `PACELC is the more nuanced extension: it asks the same question even without a partition — in the normal case, do you optimize for latency or consistency? Lower-latency reads often mean reading from the nearest replica, which may be slightly behind. Higher-consistency reads require hitting the primary, at the cost of latency. This tradeoff shows up constantly in distributed database configuration.`,
      `Key finding: CAP is a thinking tool, not just theory. Use it to make explicit, documented decisions about consistency vs availability for each data entity in your system — and communicate those decisions to your team and downstream consumers.`,
    ],
  },
]

const ACCENT_MAP: Record<string, { border: string; tag: string; icon: string; find: string }> = {
  indigo:  { border: 'border-indigo-400 dark:border-indigo-500',  tag: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',  icon: 'bg-indigo-100 dark:bg-indigo-900',  find: 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-gray-800' },
  blue:    { border: 'border-blue-400 dark:border-blue-500',      tag: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',          icon: 'bg-blue-100 dark:bg-blue-900',      find: 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-800' },
  violet:  { border: 'border-violet-400 dark:border-violet-500',  tag: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300',  icon: 'bg-violet-100 dark:bg-violet-900',  find: 'border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-gray-800' },
  emerald: { border: 'border-emerald-400 dark:border-emerald-500', tag: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300', icon: 'bg-emerald-100 dark:bg-emerald-900', find: 'border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-gray-800' },
  amber:   { border: 'border-amber-400 dark:border-amber-500',    tag: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',      icon: 'bg-amber-100 dark:bg-amber-900',    find: 'border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-gray-800' },
  orange:  { border: 'border-orange-400 dark:border-orange-500',  tag: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',  icon: 'bg-orange-100 dark:bg-orange-900',  find: 'border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-gray-800' },
  rose:    { border: 'border-rose-400 dark:border-rose-500',      tag: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',          icon: 'bg-rose-100 dark:bg-rose-900',      find: 'border-rose-200 dark:border-rose-700 bg-rose-50 dark:bg-gray-800' },
  teal:    { border: 'border-teal-400 dark:border-teal-500',      tag: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300',          icon: 'bg-teal-100 dark:bg-teal-900',      find: 'border-teal-200 dark:border-teal-700 bg-teal-50 dark:bg-gray-800' },
  cyan:    { border: 'border-cyan-400 dark:border-cyan-500',      tag: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300',          icon: 'bg-cyan-100 dark:bg-cyan-900',      find: 'border-cyan-200 dark:border-cyan-700 bg-cyan-50 dark:bg-gray-800' },
}

export default function SystemDesignBlogPage() {
  return (
    <BlogLayout
      tag="System Design"
      title="System Design From the Trenches: What I've Actually Learned Building Production Systems"
      subtitle="A practitioner's tour through the core pillars of distributed systems design — not from a whiteboard, but from real incidents, real bottlenecks, and real architectural decisions."
      readTime="~18 min read"
      sections={NAV_SECTIONS}
    >
      {/* Intro card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          System design interviews ask you to design Twitter or YouTube in 45 minutes. Real system design is slower, messier, and more interesting. It's a series of tradeoffs made under uncertainty, with imperfect information, often under production pressure.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Over my career at KPMG, Accenture, and through graduate coursework, I've encountered most of the canonical system design concepts not in theory but in practice — debugging a caching stampede, configuring circuit breakers before an outage, designing a Kafka pipeline for an AI workflow. This post covers what I've actually learned about each one.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Each section is honest about the gotchas. I've tried to write the post I wish had existed when I first encountered these concepts in production.
        </p>
      </div>

      {/* TOC */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 mb-10">
        <p className="text-xs uppercase tracking-widest text-indigo-500 mb-3 font-semibold">Topics covered</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {ARTICLES.map((a, i) => {
            const ac = ACCENT_MAP[a.accent] ?? ACCENT_MAP.indigo
            return (
              <a key={a.id} href={`#${a.id}`} className="flex items-center gap-3 group">
                <span className="text-xs text-gray-400 w-4 shrink-0">{i + 1}.</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${ac.tag}`}>{a.tag}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">{a.emoji} {a.title.split('—')[0].trim()}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-10">
        {ARTICLES.map((a, i) => {
          const ac = ACCENT_MAP[a.accent] ?? ACCENT_MAP.indigo
          return (
            <article
              key={a.id}
              id={a.id}
              className={`scroll-mt-24 rounded-2xl border-l-4 ${ac.border} border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${ac.icon}`}>
                  {a.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ac.tag}`}>{a.tag}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">Part {i + 1} of {ARTICLES.length}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">{a.title}</h2>
                </div>
              </div>
              <div className="space-y-4">
                {a.body.map((para, pi) => {
                  const isKey = para.startsWith('Key finding:')
                  if (isKey) {
                    return (
                      <div key={pi} className={`rounded-xl p-4 border ${ac.find}`}>
                        <p className="text-sm leading-relaxed">
                          <span className="font-bold">Key finding: </span>
                          {para.replace('Key finding: ', '')}
                        </p>
                      </div>
                    )
                  }
                  return (
                    <p key={pi} className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{para}</p>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>

      {/* Closing */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Common Thread</h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Looking across all ten of these concepts, the common thread is that good system design is about making tradeoffs explicit. Scalability trades operational complexity for capacity. Caching trades freshness for speed. AP systems trade consistency for availability. Microservices trade simplicity for team independence.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          The engineers I've respected most aren't the ones who've memorized every pattern — they're the ones who can articulate clearly what a given decision costs and what it buys. That clarity, more than any specific technology choice, is what makes systems that last.
        </p>
      </div>
    </BlogLayout>
  )
}
