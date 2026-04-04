'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(4)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate scroll percentage
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(scrolled, 100))

      // Calculate current page (divide scroll into quarters)
      const page = Math.min(Math.ceil((scrolled / 100) * totalPages), totalPages)
      setCurrentPage(page || 1)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalPages])

  const circumference = 2 * Math.PI * 18 // radius = 18
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* Circular Progress */}
      <div className="relative w-12 h-12">
        <svg className="transform -rotate-90 w-12 h-12">
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-white/10"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-white transition-all duration-150"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Page number in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-light text-white">
            {currentPage}/{totalPages}
          </span>
        </div>
      </div>
      
      {/* Optional: scroll percentage */}
      <span className="text-[10px] text-white/40 font-light">
        {Math.round(scrollProgress)}%
      </span>
    </div>
  )
}
