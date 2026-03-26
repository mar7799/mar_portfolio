import { FiArrowRight } from 'react-icons/fi'
import Section from '../layout/Section'
import Card from '../common/Card'
import { BLOGS } from '../../data/blogs'
import { useNav } from '../../context/nav'
import type { Page } from '../../context/nav'

export default function Blogs() {
  const { go } = useNav()

  const navigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    go(page)
  }

  return (
    <Section id="blog" title="Thought Leadership & Writing">
      {BLOGS.length ? (
        <div className="grid md:grid-cols-2 gap-5">
          {BLOGS.map((b) => (
            <Card key={b.title}>
              <div className="flex flex-col h-full gap-3">
                {b.tag && (
                  <span className="inline-flex self-start text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                    {b.tag}
                  </span>
                )}
                <p className="font-semibold text-sm leading-snug text-gray-900 dark:text-gray-100">{b.title}</p>
                {b.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{b.description}</p>
                )}
                <div className="mt-auto pt-1">
                  {b.page && (
                    <button
                      onClick={() => navigate(b.page!)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Read article <FiArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm soft-text">No posts yet. Coming soon.</p>
      )}
    </Section>
  )
}
