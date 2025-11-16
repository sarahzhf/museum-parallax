"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Search, Heart, Share2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UIProps {
  scrollProgress: number
}

export default function UI({ scrollProgress }: UIProps) {
  const [showInstructions, setShowInstructions] = useState(true)
  const [currentArtwork, setCurrentArtwork] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Déterminer l'œuvre actuelle basée sur le scroll
    const artworkNames = [
      "La Nuit Étoilée",
      "La Joconde",
      "Les Nymphéas",
      "Guernica",
      "La Grande Vague",
      "La Persistance de la Mémoire",
      "Le Cri",
      "American Gothic",
      "La Jeune Fille à la Perle",
      "Les Demoiselles d'Avignon",
      "La Création d'Adam",
      "La Liberté guidant le peuple",
      "Man with a Parot",
    ]

    const index = Math.floor(scrollProgress * artworkNames.length)
    setCurrentArtwork(artworkNames[Math.min(index, artworkNames.length - 1)] || artworkNames[0])
  }, [scrollProgress])

  return (
    <>
      {/* Navigation ultra classe */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center backdrop-blur-md bg-black/20 rounded-2xl px-8 py-4 border border-gold/20">
          <div className="text-white">
            <h1 className="text-3xl font-light tracking-wider text-gold">VERSAILLES</h1>
            <p className="text-sm text-white/70">Galerie Royale d'Art</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gold/20 hover:text-gold transition-all">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gold/20 hover:text-gold transition-all">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gold/20 hover:text-gold transition-all">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gold/20 hover:text-gold transition-all">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Instructions élégantes */}
      {showInstructions && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 backdrop-blur-md text-white px-8 py-4 rounded-2xl border border-gold/30 animate-pulse">
            <div className="flex items-center gap-3">
              <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
              <span className="text-lg">Défilez pour explorer la collection royale</span>
              <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
            </div>
          </div>
        </div>
      )}

      {/* Indicateur de progression élégant */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col items-center">
          <div className="w-2 h-40 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="w-full bg-gradient-to-t from-gold to-yellow-300 rounded-full transition-all duration-500"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="mt-4 text-center">
            <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Panneau d'information sur l'œuvre actuelle */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-black/80 backdrop-blur-md text-white p-6 rounded-2xl max-w-sm border border-gold/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
            <p className="text-sm text-gold font-medium">ŒUVRE ACTUELLE</p>
          </div>
          <h3 className="text-xl font-light mb-2">{currentArtwork}</h3>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span>Progression: {Math.round(scrollProgress * 100)}%</span>
            <span>•</span>
            <span>{Math.floor(scrollProgress * 12) + 1}/12</span>
          </div>
        </div>
      </div>

      {/* Mini-carte de navigation */}
      <div className="fixed left-8 bottom-8 z-50">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-gold/20">
          <p className="text-gold text-sm font-medium mb-3">NAVIGATION</p>
          <div className="flex gap-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-8 rounded-full transition-all duration-300 ${
                  Math.floor(scrollProgress * 12) === i ? "bg-gold" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
