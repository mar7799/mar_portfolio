import Section from '../layout/Section'
import Card from '../common/Card'
import { EDUCATION } from '../../data/education'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid md:grid-cols-2 gap-5">
        {EDUCATION.map((e) => (
          <Card key={e.school}>
            <p className="text-sm soft-text">{e.period}</p>
            <h3 className="mt-2 font-semibold">{e.degree}</h3>
            <p className="mt-1 soft-text">{e.school}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
