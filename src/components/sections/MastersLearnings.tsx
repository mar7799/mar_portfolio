import { FiGithub } from 'react-icons/fi'
import Section from '../layout/Section'
import Card from '../common/Card'
import { MASTERS_LEARNINGS } from '../../data/mastersLearnings'

export default function MastersLearnings() {
  return (
    <Section id="masters-learnings" title="Master's AI Learnings & PoCs">
      <div className="grid md:grid-cols-2 gap-5">
        {MASTERS_LEARNINGS.map((item) => (
          <Card key={item.title}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View on GitHub"
                  className="inline-flex items-center gap-1.5 shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                >
                  <FiGithub size={13} />
                  View on GitHub
                </a>
              )}
            </div>
            <ul className="mt-3 list-disc list-inside space-y-2 text-sm soft-text">
              {item.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
