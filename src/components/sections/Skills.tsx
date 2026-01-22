import Card from '../common/Card'
import { SKILLS } from '../../data/skills'
import Section from '../layout/Section'

export default function Skills() {
  return (
    <Section id="skills" title="Skills Snapshot">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((group) => (
          <Card key={group.title}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {group.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
