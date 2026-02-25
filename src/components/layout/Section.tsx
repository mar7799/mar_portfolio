type Props = {
  id: string
  title: string
  children: React.ReactNode
}

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-6 md:py-8">
      <div className="section-shell p-6 md:p-8 reveal-up">
        <div className="mb-6">
          <div className="h-1 w-20 rounded mb-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400" />
          <h2 className="text-2xl md:text-3xl font-semibold">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
