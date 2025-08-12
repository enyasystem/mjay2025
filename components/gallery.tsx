"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isManualNavigation, setIsManualNavigation] = useState(false)

  const images = [
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
      alt: "Couple at formal event",
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
      alt: "Couple taking selfie",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
      alt: "Couple at architectural location",
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
      alt: "Couple in city at night",
    },
    {
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop",
      alt: "Couple casual photo",
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
      alt: "Couple at formal event",
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
      alt: "Couple taking selfie",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
      alt: "Couple at architectural location",
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
      alt: "Couple in city at night",
    },
    {
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop",
      alt: "Couple casual photo",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsManualNavigation(true)
    setTimeout(() => setIsManualNavigation(false), 5000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsManualNavigation(true)
    setTimeout(() => setIsManualNavigation(false), 5000)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (e.key) {
        case "Escape":
          closeLightbox()
          break
        case "ArrowLeft":
          prevLightboxImage()
          break
        case "ArrowRight":
          nextLightboxImage()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen])

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextLightboxImage()
    } else if (isRightSwipe) {
      prevLightboxImage()
    }
  }

  return (
    <section id="gallery" className="min-h-screen bg-stone-50 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 sm:mb-8">
            Our Gallery
          </h2>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <svg width="30" height="30" viewBox="0 0 40 40" className="text-green-600 sm:w-10 sm:h-10">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10 20 Q15 10 20 15 Q25 10 30 20 Q25 30 20 25 Q15 30 10 20" />
              </g>
            </svg>
            <svg width="24" height="24" viewBox="0 0 30 30" className="text-green-400 sm:w-8 sm:h-8">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M8 15 Q12 8 15 12 Q18 8 22 15 Q18 22 15 18 Q12 22 8 15" />
              </g>
            </svg>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`flex gap-3 sm:gap-4 md:gap-6 ${
              isManualNavigation || isHovered
                ? "transition-transform duration-500 ease-in-out"
                : "gallery-continuous-scroll"
            }`}
            style={
              isManualNavigation || isHovered
                ? {
                    transform: `translateX(-${currentIndex * (192 + 16)}px)`,
                    width: `${images.length * (192 + 16)}px`,
                  }
                : {}
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {[...images, ...images].map((image, index) => (
              <div key={index} className="w-48 sm:w-60 md:w-72 lg:w-80 flex-shrink-0">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => openLightbox(index % images.length)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-green-600 hover:text-green-700 border border-green-200 hover:border-green-300"
              aria-label="Previous images"
            >
              <span className="text-xl sm:text-2xl font-bold">‹</span>
            </button>

            <span className="text-sm sm:text-base text-gray-600 font-medium">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-green-600 hover:text-green-700 border border-green-200 hover:border-green-300"
              aria-label="Next images"
            >
              <span className="text-xl sm:text-2xl font-bold">›</span>
            </button>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-full max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors flex items-center justify-center text-white"
            >
              <X className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={prevLightboxImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors flex items-center justify-center text-white text-xl sm:text-2xl font-bold"
            >
              ‹
            </button>

            <button
              onClick={nextLightboxImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors flex items-center justify-center text-white text-xl sm:text-2xl font-bold"
            >
              ›
            </button>

            <img
              src={images[lightboxIndex].src.replace("w=600&h=400", "w=1200&h=800") || "/placeholder.svg"}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg mx-auto block"
            />

            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
