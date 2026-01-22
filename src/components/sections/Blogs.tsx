import { FiExternalLink } from 'react-icons/fi';
import Section from '../layout/Section';
import Card from '../common/Card';
import { BLOGS } from '../../data/blogs';

export default function Blogs() {
    return (
        <Section id="blog" title="Technical Articles">
              {BLOGS.length ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {BLOGS.map((b) => (
                    <Card key={b.title}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{b.title}</span>
                        <a className="inline-flex items-center gap-1 text-sm hover:text-indigo-500" href={b.href}>
                          Read <FiExternalLink />
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No posts yet. Coming soon.</p>
              )}
            </Section>
    )
}