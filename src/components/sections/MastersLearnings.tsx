import Section from '../layout/Section'
import Card from '../common/Card'
import { MASTERS_LEARNINGS } from '../../data/mastersLearnings'

export default function MastersLearnings() {
  return (
    <Section id="masters-learnings" title="Master's AI Learnings & PoCs">
      <div className="grid md:grid-cols-2 gap-5">
        {MASTERS_LEARNINGS.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
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
