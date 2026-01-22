import Section from '../layout/Section';
import Card from '../common/Card';
import { EXPERIENCE } from '../../data/experience';

export default function Experience() {
    return (
        <Section id="experience" title="Professional Experience">
          <div className="space-y-5">
            {EXPERIENCE.map((e) => (
              <Card key={e.company + e.title}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{e.title} — {e.company}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{e.period}</span>
                </div>
                <ul className="mt-3 list-disc list-inside space-y-1 text-sm">{e.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
              </Card>
            ))}
          </div>
        </Section>
    )
}