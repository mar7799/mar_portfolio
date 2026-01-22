export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-6">
      {children}
    </div>
  )
}
