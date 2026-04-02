import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPhotos } from '@/lib/photos'

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

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories[params.category as keyof typeof categories]
  
  if (!category) {
    notFound()
  }

  const photos = await getPhotos(params.category)

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <Link href="/photos" className="inline-block mb-12 text-white/40 hover:text-white transition-colors duration-300">
          ← Back to Photos
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            {category.title}
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent mb-6"></div>
          <p className="text-white/60 font-light text-lg mb-4">
            {category.description}
          </p>
          <p className="text-white/40 text-sm">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
          </p>
        </header>

        {photos.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="relative group overflow-hidden rounded-sm border border-white/5 hover:border-white/20 transition-all duration-300">
                  <Image
                    src={photo.path}
                    alt={photo.filename.replace(/\.[^/.]+$/, '')}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 font-light text-lg">
              No photos available yet
            </p>
          </div>
        )}

      </div>
    </main>
  )
}
