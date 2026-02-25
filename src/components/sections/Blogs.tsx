import { FiExternalLink } from 'react-icons/fi';
import Section from '../layout/Section';
import Card from '../common/Card';
import { BLOGS } from '../../data/blogs';

export default function Blogs() {
    return (
        <Section id="blog" title="Thought Leadership Topics">
              {BLOGS.length ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {BLOGS.map((b) => (
                    <Card key={b.title}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{b.title}</span>
                        <a className="inline-flex items-center gap-1 text-sm text-blue-700 dark:text-blue-300 hover:underline" href={b.href}>
                          Read <FiExternalLink />
                        </a>
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
