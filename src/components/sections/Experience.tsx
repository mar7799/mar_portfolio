import Section from '../layout/Section';
import Card from '../common/Card';
import { EXPERIENCE } from '../../data/experience';

export default function Experience() {
    return (
        <Section id="experience" title="Professional Experience">
          <div className="space-y-5">
            {EXPERIENCE.map((e) => (
              <Card key={e.company + e.title}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-lg font-semibold">{e.title} — {e.company}</h3>
                  <span className="text-sm soft-text">{e.period}</span>
                </div>
                <ul className="mt-3 list-disc list-inside space-y-2 text-sm soft-text">
                  {e.bullets.map((b,i)=><li key={i}>{b}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </Section>
    )
}
