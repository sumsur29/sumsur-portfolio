import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        
        <header className="mb-24 text-center">
          <h1 className="text-7xl font-light mb-6 tracking-tight">
            Sumeet Surana
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-white/60 font-light tracking-wide mb-2">
            सफ़र ख़ूबसूरत है मंज़िल से भी
          </p>
          <p className="text-white/40 font-light italic">
            The journey is more beautiful than the destination
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          
          <Link href="/photos" className="group">
            <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-12 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl mb-6 font-light">📸</div>
                <h2 className="text-2xl font-light mb-3 tracking-wide">
                  Photos
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  Visual stories
                </p>
              </div>
            </div>
          </Link>

          <Link href="/poems" className="group">
            <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-12 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl mb-6 font-light">✍️</div>
                <h2 className="text-2xl font-light mb-3 tracking-wide">
                  Poems
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  Words from the heart
                </p>
              </div>
            </div>
          </Link>

          <Link href="/experiments" className="group">
            <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-12 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-5xl mb-6 font-light">🧪</div>
                <h2 className="text-2xl font-light mb-3 tracking-wide">
                  Experiments
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  Side projects and prototypes
                </p>
              </div>
            </div>
          </Link>

        </div>

        <div className="text-center mb-16">
          <Link href="/about" className="inline-block text-white/60 hover:text-white transition-colors duration-300 font-light">
            About me →
          </Link>
        </div>

        <footer className="pt-16 border-t border-white/10">
          <div className="flex justify-center gap-12 text-white/40 font-light">
            <a href="https://www.linkedin.com/in/suranasumeet" target="_blank" rel="noopener noreferrer" 
               className="hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://instagram.com/sum.sur" target="_blank" rel="noopener noreferrer"
               className="hover:text-white transition-colors duration-300">
              Instagram
            </a>
            <a href="mailto:sumeet9surana@gmail.com" 
               className="hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </footer>

      </div>
    </main>
  )
}
