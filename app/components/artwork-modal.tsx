"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface Artwork {
  id: number
  title: string
  artist: string
  year: string
  description: string
  image: string
}

interface ArtworkModalProps {
  artwork: Artwork
  onClose: () => void
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10)
    document.body.style.overflow = "hidden"

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 
        transition-opacity duration-300
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          bg-white max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl 
          flex flex-col md:flex-row transition-transform duration-500
          ${isVisible ? "scale-100" : "scale-95"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
          <Image
            src={artwork.image || "/placeholder.svg"} alt={artwork.title}
            fill className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-light mb-2">{artwork.title}</h2>
          <p className="text-xl text-gray-600 mb-1">{artwork.artist}</p>
          <p className="text-lg text-gray-500 mb-6">{artwork.year}</p>

          <div className="h-px w-16 bg-gray-300 mb-6"></div>

          <p className="text-gray-700 leading-relaxed">{artwork.description}</p>

          <div className="mt-auto pt-6">
            <button
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              onClick={handleClose}
            >
              Retour à la galerie
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}