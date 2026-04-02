import Link from 'next/link'

export default function Apps() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="text-white/40 hover:text-white mb-12 inline-block font-light">
          ← Back
        </Link>

        <div className="mb-20">
          <h1 className="text-6xl font-light mb-4 tracking-tight">Apps</h1>
          <div className="h-px w-16 bg-white/20 mb-6"></div>
          <p className="text-white/50 font-light text-lg">Products in progress and shipped</p>
        </div>

        <div className="text-center text-white/40 py-20">
          <p className="text-lg font-light">Coming soon...</p>
        </div>
      </div>
    </main>
  )
}
