"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, Heart, Share2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ArtworkDetailModalProps {
  artwork: {
    id: number
    title: string
    artist: string
    year: string
    description: string
    image: string
    technique?: string
    dimensions?: string
    location?: string
    period?: string
    style?: string
  }
  onClose: () => void
}

export default function ArtworkDetailModal({ artwork, onClose }: ArtworkDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 10)
    document.body.style.overflow = "hidden"

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleEscape)

    return () => {
      clearTimeout(t)
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
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          relative max-w-7xl w-full h-[95vh] rounded-lg
          transition-transform duration-500
          ${isVisible ? "scale-100 pointer-events-auto" : "scale-95 pointer-events-none"}
          bg-black/95 backdrop-blur-md
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <div
            className={`relative transition-all duration-700 ease-out ${
              isZoomed ? "w-[200%] h-[200%]" : "w-full h-full"
            }`}
          >
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <Button
            variant="outline"
            size="icon"
            className={`bg-black/60 border-gray-600 text-white hover:bg-black/80 ${
              liked ? "text-red-500 border-red-500" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setLiked(!liked)
            }}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-black/60 border-gray-600 text-white hover:bg-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-black/60 border-gray-600 text-white hover:bg-black/80"
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(!isZoomed)
            }}
          >
            {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-black/60 border-gray-600 text-white hover:bg-black/80"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div
          className={`
          absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent
          backdrop-blur-md transition-all duration-500
          ${showInfo ? "translate-y-0" : "translate-y-[calc(100%-60px)]"}
        `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2"
          >
            <ChevronDown className={`w-5 h-5 text-white ${showInfo ? "rotate-180" : ""}`} />
          </button>

          <div className="p-8 pt-16 text-white">
            <h2 className="text-4xl font-light mb-3">{artwork.title}</h2>
            <p className="text-2xl text-gray-300 mb-2">{artwork.artist}</p>
            <p className="text-xl text-gray-400 mb-6">{artwork.year}</p>

            <p className="text-lg text-gray-200 leading-relaxed max-w-3xl mb-8">
              {artwork.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}