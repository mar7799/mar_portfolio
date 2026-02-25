import Section from '../layout/Section'
import Card from '../common/Card'
import { PROJECTS } from '../../data/projects'

export default function Projects() {
  return (
    <Section id="projects" title="Selected Engineering Work">
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <Card key={p.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {p.name}
                </h3>

                <p className="text-sm soft-text">
                  {p.role} • {p.year}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {p.stack.split(',').map((s) => (
                  <span
                    key={s}
                    className="text-xs project-pill px-2 py-1 rounded-full"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-3 space-y-2 text-sm list-disc list-inside">
              {p.bullets.map((b, i) => (
                <li key={i} className="soft-text">
                  {b}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
