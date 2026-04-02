import Link from 'next/link'

const categories = [
  {
    title: "Nature",
    slug: "nature",
    description: "Landscapes, mountains, oceans, and the natural world"
  },
  {
    title: "Cities and Architecture",
    slug: "cities",
    description: "Urban landscapes, buildings, and geometric patterns"
  },
  {
    title: "People",
    slug: "people",
    description: "Portraits, candid moments, and human stories"
  },
  {
    title: "B&W",
    slug: "bw",
    description: "Timeless moments in black and white"
  },
  {
    title: "Photos that smell good",
    slug: "smell-good",
    description: "Coffee, rain, old books, and other sensory memories"
  },
  {
    title: "Wildlife",
    slug: "wildlife",
    description: "Animals in their natural habitat"
  }
]

export default function Photos() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link href="/" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Photos
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg">
            Visual narratives from around the world. Click a category to explore.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/photos/${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-10 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-light tracking-wide group-hover:text-white transition-colors">
                      {category.title}
                    </h2>
                    <svg 
                      className="w-5 h-5 text-white/40 group-hover:text-white transition-all group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  <p className="text-white/50 font-light leading-relaxed text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
