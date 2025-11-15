"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, Html } from "@react-three/drei"
import * as THREE from "three"

import starryNight from "@/public/images/starry-night.png"
import monaLisa from "@/public/images/mona-lisa.png"
import waterLilies from "@/public/images/water-lilies.png"
import guernica from "@/public/images/guernica.png"
import greatWave from "@/public/images/great-wave.png"
import persistence from "@/public/images/persistence-memory.png"
import scream from "@/public/images/the-scream.png"
import americanGothic from "@/public/images/american-gothic.png"
import pearlGirl from "@/public/images/girl-with-pearl.png"
import demoiselles from "@/public/images/demoiselles-avignon.png"
import creationAdam from "@/public/images/creation-adam.png"
import liberty from "@/public/images/liberty-leading.png"

const textureMap: Record<string, string> = {
  "images/starry-night.png": starryNight.src,
  "images/mona-lisa.png": monaLisa.src,
  "images/water-lilies.png": waterLilies.src,
  "images/guernica.png": guernica.src,
  "images/great-wave.png": greatWave.src,
  "images/persistence-memory.png": persistence.src,
  "images/the-scream.png": scream.src,
  "images/american-gothic.png": americanGothic.src,
  "images/girl-with-pearl.png": pearlGirl.src,
  "images/demoiselles-avignon.png": demoiselles.src,
  "images/creation-adam.png": creationAdam.src,
  "images/liberty-leading.png": liberty.src,
}

export type Artwork = {
  id: number
  title: string
  artist: string
  year: string
  image: string
  description: string
  position: [number, number, number]
  order: number
}

interface ArtworkMeshProps {
  artwork: Artwork
  position: [number, number, number]
  onClick: () => void
  goldMaterial?: THREE.Material
  isAnimating?: boolean
}

export default function ArtworkMesh({
  artwork,
  position,
  onClick,
  goldMaterial,
  isAnimating,
}: ArtworkMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const [hovered, setHovered] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  const texture = useTexture(textureMap[artwork.image])

  // ------- CURSEUR MAIN -------
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer"
    else document.body.style.cursor = "default"
  }, [hovered])
  // -----------------------------

  useEffect(() => {
    if (isAnimating) setAnimationProgress(0)
  }, [isAnimating])

  useFrame((state, delta) => {
    if (!meshRef.current || !frameRef.current || !groupRef.current) return

    // scale animation on hover
    const scale = hovered ? 1.15 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    frameRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)

    // float animation (idle)
    if (!isAnimating) {
      const float = Math.sin(state.clock.elapsedTime + artwork.id) * 0.08
      groupRef.current.position.y = position[1] + float
    }

    // zoom animation (open artwork)
    if (isAnimating) {
      setAnimationProgress((p) => Math.min(p + delta * 0.8, 1))

      const startPos = new THREE.Vector3(...position)
      const endPos = new THREE.Vector3(0, 0, 6)
      const currentPos = startPos.lerp(endPos, animationProgress)
      groupRef.current.position.copy(currentPos)

      groupRef.current.rotation.y = animationProgress * Math.PI * 2
      groupRef.current.scale.setScalar(1 + animationProgress * 2)

      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = animationProgress * 0.3
    }

    // reset when not animating
    if (!isAnimating) {
      groupRef.current.position.set(...position)
      groupRef.current.rotation.y = 0
      groupRef.current.scale.setScalar(1)

      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0
    }
  })

  const frameMaterial =
    goldMaterial ||
    new THREE.MeshStandardMaterial({
      color: "#d4af37",
      metalness: 0.9,
      roughness: 0.1,
    })

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={frameRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        castShadow
      >
        <boxGeometry args={[2.6, 3.2, 0.3]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh
        ref={meshRef}
        position={[0, 0, 0.16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        castShadow
      >
        <planeGeometry args={[2.2, 2.8]} />
        <meshStandardMaterial map={texture} emissive={"#000"} emissiveIntensity={0} />
      </mesh>

      {hovered && (
        <Html position={[0, -2, 0.8]} center>
          <div className="bg-black/90 text-white p-4 rounded-xl text-center">
            <h3 className="font-bold text-lg">{artwork.title}</h3>
            <p className="text-sm opacity-80">{artwork.artist}</p>
            <p className="text-xs opacity-60">{artwork.year}</p>
          </div>
        </Html>
      )}
    </group>
  )
}