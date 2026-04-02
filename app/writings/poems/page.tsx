import Link from 'next/link'

export default function Poems() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link href="/writings" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Writings
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Poems
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg">
            Poetry and verse
          </p>
        </header>

        <div className="text-center py-20">
          <p className="text-white/40 font-light text-lg">
            Coming soon
          </p>
        </div>

      </div>
    </main>
  )
}
