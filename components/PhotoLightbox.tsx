'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Photo {
  filename: string
  path: string
}

interface PhotoLightboxProps {
  photo: Photo
  index: number
}

export default function PhotoLightbox({ photo, index }: PhotoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div 
        key={index} 
        className="break-inside-avoid cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative group overflow-hidden rounded-sm border border-white/5 hover:border-white/20 transition-all duration-300">
          <Image
            src={photo.path}
            alt={photo.filename.replace(/\.[^/.]+$/, '')}
            width={800}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/60 hover:text-white text-4xl font-light transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={photo.path}
              alt={photo.filename.replace(/\.[^/.]+$/, '')}
              width={2400}
              height={2400}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
