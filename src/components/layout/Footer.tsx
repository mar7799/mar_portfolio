export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-300 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm soft-text">
        © {new Date().getFullYear()} Amram Raju Madipalli • Java, FastAPI, and LLM Engineer Portfolio
      </div>
    </footer>
  )
}
