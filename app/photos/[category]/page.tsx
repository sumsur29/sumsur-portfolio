import Link from 'next/link'
import { notFound } from 'next/navigation'

const categories = {
  nature: {
    title: "Nature",
    description: "Landscapes, mountains, oceans, and the natural world"
  },
  cities: {
    title: "Cities and Architecture",
    description: "Urban landscapes, buildings, and geometric patterns"
  },
  people: {
    title: "People",
    description: "Portraits, candid moments, and human stories"
  },
  bw: {
    title: "B&W",
    description: "Timeless moments in black and white"
  },
  "smell-good": {
    title: "Photos that smell good",
    description: "Coffee, rain, old books, and other sensory memories"
  },
  wildlife: {
    title: "Wildlife",
    description: "Animals in their natural habitat"
  }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    category: slug,
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories[params.category as keyof typeof categories]
  
  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link href="/photos" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Photos
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            {category.title}
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg">
            {category.description}
          </p>
        </header>

        <div className="text-center py-20">
          <p className="text-white/40 font-light text-lg">
            Gallery coming soon
          </p>
        </div>

      </div>
    </main>
  )
}
