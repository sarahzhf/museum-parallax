"use client"

import { useEffect, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import Gallery3D from "./components/gallery-3d"
import LoadingScreen from "./components/loading-screen"
import UI from "./components/ui"
import ArtworkDetailModal from "./components/artwork-detail-modal"
import EntranceAnimation from "./components/entrance-animation"
import Chatbot from "./components/chatbot"

import { artworks } from "./data/artworks"
import type { Artwork } from "./data/artworks"

export default function MuseumPage() {

  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [artworkAnimation, setArtworkAnimation] = useState<Artwork | null>(null)

  const [autoMessage, setAutoMessage] = useState<string | null>(null)
  const [pendingZoom, setPendingZoom] = useState<number | null>(null)

  const [entranceComplete, setEntranceComplete] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  // scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ACTION ZOOM (depuis chatbot)
  useEffect(() => {
    if (pendingZoom == null) return

    const found = artworks.find(a => a.id === pendingZoom)
    if (!found) return

    setArtworkAnimation(found)

    setTimeout(() => {
      setSelectedArtwork(found)
      setArtworkAnimation(null)
    }, 1200)

    setPendingZoom(null)
  }, [pendingZoom])

  const handleArtworkSelect = (artwork: Artwork) => {
    setArtworkAnimation(artwork)

    setAutoMessage(
      `L'utilisateur a ouvert "${artwork.title}". Donne une description guidée.`
    )

    setTimeout(() => {
      setSelectedArtwork(artwork)
      setArtworkAnimation(null)
    }, 1200)
  }

  const closeModal = () => {
    setSelectedArtwork(null)
  }

  if (!entranceComplete) {
    return <EntranceAnimation onComplete={() => setEntranceComplete(true)} />
  }

  return (
    <>
      {/* SCÈNE 3D */}
      <div className="fixed inset-0 w-full h-full pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true }}
          onCreated={() => setSceneReady(true)}
        >
          <Suspense fallback={null}>
            <Environment preset="warehouse" />
            <Gallery3D
              scrollProgress={scrollProgress}
              onArtworkSelect={handleArtworkSelect}
              artworkAnimation={artworkAnimation}
            />
          </Suspense>
        </Canvas>

        {!sceneReady && <LoadingScreen />}
      </div>

      {/* UI */}
      <UI scrollProgress={scrollProgress} />

      {/* CHATBOT */}
      <Chatbot
        selectedArtwork={selectedArtwork}
        autoMessage={autoMessage}
        onAction={(action) => {
          if (action?.type === "ZOOM_ARTWORK") {
            setPendingZoom(action.artworkId)
          }
        }}
      />

      {/* scroll */}
      <div className="relative w-full h-[800vh]" />

      {selectedArtwork && (
        <ArtworkDetailModal artwork={selectedArtwork} onClose={closeModal} />
      )}
    </>
  )
}