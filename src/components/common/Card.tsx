export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-card p-6 reveal-up">
      {children}
    </div>
  )
}
