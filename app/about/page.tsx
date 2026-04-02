import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        <Link href="/" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back
        </Link>

        <div className="grid md:grid-cols-5 gap-12 items-start mb-16">
          <div className="md:col-span-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10">
              <Image
                src="/sumeet.jpg"
                alt="Sumeet Surana"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <div>
              <h1 className="text-5xl font-light mb-4 tracking-tight">
                About
              </h1>
              <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
            </div>

            <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
              <p>
                I'm Sumeet — builder, writer, and photographer based in Dubai.
              </p>

              <p>
                Currently working at Cypher Capital, where I invest in early-stage crypto and blockchain companies. 
                Before that, I spent time exploring different ways to create, think, and build.
              </p>

              <p>
                I write about technology, markets, life, and ideas that don't fit anywhere else. 
                My photography is an attempt to capture the world as I see it — quiet moments, strange patterns, 
                things that make you pause.
              </p>

              <p>
                When I'm not working, I'm usually tinkering with side projects, reading too much, 
                or trying to convince myself that the next app idea is worth building.
              </p>

              <p>
                I believe in building in public, learning by doing, and finding beauty in the mundane.
              </p>
            </div>

            <div className="pt-8">
              <h2 className="text-2xl font-light mb-6">Connect</h2>
              <div className="space-y-3">
                <a 
                  href="https://www.linkedin.com/in/suranasumeet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-white/50 hover:text-white transition-colors duration-300"
                >
                  LinkedIn →
                </a>
                <a 
                  href="https://instagram.com/sum.sur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-white/50 hover:text-white transition-colors duration-300"
                >
                  Instagram →
                </a>
                <a 
                  href="mailto:sumeet9surana@gmail.com"
                  className="block text-white/50 hover:text-white transition-colors duration-300"
                >
                  Email →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
