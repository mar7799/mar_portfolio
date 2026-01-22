import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import Section from '../layout/Section';
import Card from '../common/Card';
import Button from '../ui/Button';

export default function Contact() {
    return (
        <Section id="contact" title="Contact">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Open to roles and collaborations</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Let’s build something</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:rajuamram99@gmail.com"><Button variant="default" size="md" className="inline-flex items-center gap-2"><FiMail /> Email Me</Button></a>
                <a href="https://github.com/mar7799" target="_blank" rel="noreferrer"><Button variant="ghost" size="md" className="inline-flex items-center gap-2"><FiGithub /> GitHub</Button></a>
                <a href="https://linkedin.com/in/amram-raju-madipalli-694296242" target="_blank" rel="noreferrer"><Button variant="ghost" size="md" className="inline-flex items-center gap-2"><FiLinkedin /> LinkedIn</Button></a>
              </div>
            </div>
          </Card>
        </Section>
    )
}