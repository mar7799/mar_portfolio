import BlogLayout from '../components/layout/BlogLayout'

const NAV = [
  { id: 'quality-gates', label: 'CI Quality Gates' },
  { id: 'sql-tuning', label: 'SQL Tuning' },
  { id: 'observability', label: 'Observability' },
  { id: 'putting-together', label: 'Putting It Together' },
]

export default function ReliabilityBlogPage() {
  return (
    <BlogLayout
      tag="DevOps & Reliability"
      title="Improving Reliability with CI Quality Gates, SQL Tuning, and Observability"
      subtitle="Three practical disciplines that collectively transformed release confidence and production stability — drawn from five years across KPMG and Accenture."
      readTime="~10 min read"
      sections={NAV}
    >
      {/* Intro */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-10">
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Reliability isn't a feature you add — it's a discipline you build into every layer of a system. Over my career I've found that three practices, applied consistently, account for most of the reliability improvements I've delivered: automated quality gates in CI, thoughtful SQL tuning, and proper observability instrumentation.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          None of these is glamorous. None is a framework launch or an architectural redesign. But they're what separate systems that quietly work from systems that quietly fail.
        </p>
      </div>

      {/* CI Quality Gates */}
      <article id="quality-gates" className="scroll-mt-24 rounded-2xl border-l-4 border-indigo-400 dark:border-indigo-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-indigo-100 dark:bg-indigo-900 shrink-0">🚦</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">CI Quality Gates — Catching Problems Before Humans Do</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          A quality gate is a check in your CI pipeline that must pass before code can proceed — to merge, to deploy, to release. The concept is simple; the discipline is in defining gates that catch real problems without generating so many false positives that engineers start ignoring or bypassing them.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          At Accenture, before I introduced quality gates, the release process involved a manual QA signoff day. Engineers submitted code, QA ran it through a checklist, found issues, reported them, and the cycle repeated. This was a 2-3 day feedback loop for every defect. With quality gates in GitHub Actions, the feedback loop collapsed to minutes.
        </p>

        <div className="space-y-5 mb-5">
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">The gate hierarchy I use:</p>
            <div className="space-y-3">
              {[
                { tier: 'Gate 1 — Compilation', desc: 'The build must compile. This sounds obvious but in teams with parallel development, breaking the build is more common than you\'d think. Fast, cheap, essential.' },
                { tier: 'Gate 2 — Unit tests', desc: 'Every unit test must pass. Unit tests are fast (milliseconds each) and should run on every commit. I enforce a minimum threshold — not a fixed coverage percentage (which gaming is easy) but presence of tests for business logic methods. A service with no tests has no gate.' },
                { tier: 'Gate 3 — Integration tests', desc: 'Tests that exercise the application against real dependencies — a test database, a mock external service. These are slower but catch contract violations that unit tests miss. I run these on PR merges, not every commit, to balance speed with coverage.' },
                { tier: 'Gate 4 — Static analysis', desc: 'SpotBugs, Checkstyle, PMD in Java; pylint in Python. These catch common bug patterns, security anti-patterns, and style violations automatically. I treat certain categories (null pointer risk, SQL injection patterns) as blocking; style issues as warnings.' },
                { tier: 'Gate 5 — Regression suite', desc: 'A curated set of end-to-end scenarios representing the most critical business flows. These run pre-deploy and gate the promotion to production. Slower, but the highest-confidence signal.' },
              ].map((g) => (
                <div key={g.tier} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{g.tier}</p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The most common failure mode for quality gates: they become too slow. If CI takes 45 minutes to run, engineers stop waiting for it and start merging on faith. Keep unit tests under 5 minutes, integration tests under 15. If a suite is growing beyond those targets, parallelize test execution or audit for tests that are doing too much.
        </p>
        <div className="rounded-xl p-4 border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">Key insight: </span>
            Quality gates work when they're fast and trusted. Fast means engineers get feedback before they context-switch. Trusted means the gates catch real bugs often enough that engineers don't route around them. Maintain both properties actively — a slow or noisy gate is worse than no gate because it trains engineers to ignore CI.
          </p>
        </div>
      </article>

      {/* SQL Tuning */}
      <article id="sql-tuning" className="scroll-mt-24 rounded-2xl border-l-4 border-emerald-400 dark:border-emerald-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-emerald-100 dark:bg-emerald-900 shrink-0">🗄️</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">SQL Tuning — The Database Is Usually Innocent</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          "The database is slow" is almost never the full story. In my experience, database performance problems are almost always query problems — either a query that's doing more work than it needs to, a missing index that forces a full table scan, or Hibernate generating SQL that no developer would write by hand.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          At Accenture I inherited a reporting service with queries that regularly took 8-12 seconds against an Oracle database. After tuning, the same queries ran in 300-500ms. The database hardware didn't change. The data volume didn't change. Only the queries and indexes changed.
        </p>

        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">The tuning workflow I follow:</p>
        <div className="space-y-4 mb-5">
          {[
            { step: '1. Identify the slow queries', desc: 'Slow query logs in MySQL/PostgreSQL, AWR reports in Oracle, or application-level query timing with Hibernate statistics. You can\'t tune what you haven\'t measured. I add query timing to every service from day one.' },
            { step: '2. Read the query plan', desc: 'EXPLAIN ANALYZE (PostgreSQL) or EXPLAIN PLAN (Oracle) shows exactly what the database is doing. Full table scans on large tables are almost always the culprit. Nested loop joins on unindexed columns are another common offender. The plan doesn\'t lie.' },
            { step: '3. Add targeted indexes', desc: 'Index columns used in WHERE clauses, JOIN conditions, and ORDER BY expressions for the slow queries. Composite indexes can serve multiple query patterns. But don\'t add indexes blindly — every index costs write performance and storage. Add what the slow queries need, not everything.' },
            { step: '4. Rewrite problematic queries', desc: 'Sometimes the query logic itself is wrong. Correlated subqueries that run once per row are a classic trap. Replacing them with a JOIN or a CTE often drops execution time by an order of magnitude. Hibernate\'s N+1 problem (one query per entity in a collection) is another common source — solved with eager join fetching or batch fetching.' },
            { step: '5. Verify and monitor', desc: 'Re-run the query plan after changes. Confirm the improvement in a staging environment before production. Add the query to your slow query monitoring so regression is caught early.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.step}</p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-4 border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">Key insight: </span>
            Learn to read query execution plans. It's the single highest-ROI database skill you can develop. A 10-minute investment in reading EXPLAIN ANALYZE has saved me hours of guessing.
          </p>
        </div>
      </article>

      {/* Observability */}
      <article id="observability" className="scroll-mt-24 rounded-2xl border-l-4 border-blue-400 dark:border-blue-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-blue-100 dark:bg-blue-900 shrink-0">🔭</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">Observability — If You Can't See It, You Can't Fix It</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The difference between a service that's easy to operate and one that's painful becomes most visible during incidents. A well-instrumented service tells you what went wrong, when it started, and what was affected. A poorly instrumented service makes you guess.
        </p>

        <div className="space-y-5">
          {[
            {
              title: 'Structured logging with correlation IDs',
              color: 'text-blue-700 dark:text-blue-300',
              body: 'Every log line should be JSON with defined fields: timestamp, level, service, correlationId, message, and any relevant context. The correlation ID (trace ID) is generated at the API gateway or entry point and propagated through every downstream call via HTTP headers or message attributes. This makes it possible to search for a single request across every service it touched — a capability that\'s invaluable during incident analysis. At KPMG I use the ELK stack: logs ship to Elasticsearch via Logstash, and Kibana dashboards make searching and visualizing patterns fast.',
            },
            {
              title: 'Metrics that matter',
              color: 'text-blue-700 dark:text-blue-300',
              body: 'Not all metrics are equally useful. The four golden signals (from Google SRE) are the right starting point: latency (how long requests take), traffic (how many requests are coming in), errors (what fraction of requests are failing), and saturation (how full the system is — CPU, memory, queue depth). I expose these via Micrometer in Spring Boot, scraped by Prometheus, visualized in Grafana. Alert on error rate > threshold and p99 latency > threshold — these catch most real problems before users report them.',
            },
            {
              title: 'Actionable alerting',
              color: 'text-blue-700 dark:text-blue-300',
              body: 'Alert fatigue is as dangerous as no alerting. If engineers are getting paged for things that don\'t require action, they start ignoring alerts — including the real ones. Every alert should be actionable: when this fires, there is a specific thing to investigate or do. Alerts that say "CPU usage is high" without context are noise. Alerts that say "error rate on /api/orders exceeded 2% for 5 consecutive minutes — see runbook link" are signal. I maintain a runbook for every production alert.',
            },
          ].map((s) => (
            <div key={s.title}>
              <p className={`font-semibold text-sm mb-1.5 ${s.color}`}>{s.title}</p>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl p-4 border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-800">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">Key insight: </span>
            Instrumentation is a first-class engineering task, not an afterthought. Retrofitting observability into an uninstrumented service is much harder than adding it from the start. Add structured logging and the four golden signal metrics to every new service before it goes to production.
          </p>
        </div>
      </article>

      {/* Putting it together */}
      <article id="putting-together" className="scroll-mt-24 rounded-2xl border-l-4 border-amber-400 dark:border-amber-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-amber-100 dark:bg-amber-900 shrink-0">🏆</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 self-center">How the Three Work Together</h2>
        </div>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          These three practices aren't independent — they reinforce each other in a reliability flywheel.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Quality gates catch most problems before they reach production. The ones that get through are detected quickly by observability — error rate alerts fire before most users notice. When an issue is reported, structured logs with correlation IDs make root cause analysis fast. SQL tuning, discovered via slow query logging (which is part of observability), prevents performance degradation from becoming user-facing incidents.
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          The cumulative effect: fewer incidents, faster detection when they happen, faster resolution, and continuous improvement because observability data feeds back into what you gate on in CI.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Quality Gates', outcome: 'Prevent problems from reaching production', color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'SQL Tuning', outcome: 'Eliminate performance issues before they escalate', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Observability', outcome: 'Detect and diagnose problems quickly when they occur', color: 'text-blue-600 dark:text-blue-400' },
          ].map((p) => (
            <div key={p.label} className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className={`text-sm font-bold mb-1 ${p.color}`}>{p.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.outcome}</p>
            </div>
          ))}
        </div>
      </article>
    </BlogLayout>
  )
}
