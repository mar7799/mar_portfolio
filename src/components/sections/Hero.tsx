import { FiDownload, FiMail, FiExternalLink } from 'react-icons/fi';
import Button from '../ui/Button';
import Card from '../common/Card';
import my_resume from '../../assets/Amram M Full Stack.docx';

export default function Hero() {
  return (
    <section className="py-8 md:py-14">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Senior Java Full-Stack Developer</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">6+ years designing, building, and deploying scalable enterprise apps with <span className="font-semibold">Java, Spring Boot, React</span>.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={my_resume} target="_blank" rel="noreferrer">
              <Button variant="default" size="md" className="inline-flex items-center gap-2"><FiDownload /> Download Resume</Button>
            </a>
            <a href="mailto:rajuamram99@gmail.com">
              <Button variant="default" size="md" className="inline-flex items-center gap-2"><FiMail /> Email</Button>
            </a>
          </div>
        </div>

        <Card>
          <p className="text-sm uppercase tracking-widest text-indigo-500 mb-2">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>GitHub</span>
              <a href="https://github.com/mar7799" className="inline-flex items-center gap-1 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded" target="_blank" rel="noreferrer">
                Open <FiExternalLink />
              </a>
            </li>
            <li className="flex items-center justify-between">
              <span>LinkedIn</span>
              <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" className="inline-flex items-center gap-1 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded" target="_blank" rel="noreferrer">
                Open <FiExternalLink />
              </a>
            </li>
            <li className="flex items-center justify-between">
              <span>Blog</span>
              <a href="#blog" className="inline-flex items-center gap-1 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded">
                Jump <FiExternalLink />
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  )
}