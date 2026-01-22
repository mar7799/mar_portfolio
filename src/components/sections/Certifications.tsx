import Section from '../layout/Section'
import Card from '../common/Card'
import {CERTS}  from '../../data/certs'

export default function Certifications() {
    return (
        <Section id="certs" title="Certifications">
          <div className="grid md:grid-cols-2 gap-5">
            {CERTS.map((c) => (
              <Card key={c.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{c.year}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>
    )
}