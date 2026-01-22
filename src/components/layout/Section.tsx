type Props = {
  id: string
  title: string
  children: React.ReactNode
}

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-6 md:py-8">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-6 md:p-8">
        <div className="mb-6">
          <div className="h-1 w-16 bg-indigo-500 rounded mb-3" />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
