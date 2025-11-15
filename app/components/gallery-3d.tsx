"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import * as THREE from "three"
import ArtworkMesh, { Artwork } from "./artwork-mesh"
import VersaillesDecor from "./versailles-decor"
import { artworks } from "../data/artworks"

interface Gallery3DProps {
  scrollProgress: number
  onArtworkSelect: (artwork: Artwork) => void
  artworkAnimation: Artwork | null
}

export default function Gallery3D({
  scrollProgress,
  onArtworkSelect,
  artworkAnimation,
}: Gallery3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))

  const materials = useMemo(
    () => ({
      marbleMaterial: new THREE.MeshStandardMaterial({
        color: "#f8f8ff",
        metalness: 0.1,
        roughness: 0.6,
      }),
      goldMaterial: new THREE.MeshStandardMaterial({
        color: "#d4af37",
        metalness: 0.9,
        roughness: 0.1,
        emissive: "#332200",
        emissiveIntensity: 0.2,
      }),
      floorMaterial: new THREE.MeshStandardMaterial({
        color: "#8b7355",
        metalness: 0.1,
        roughness: 0.8,
      }),
    }),
    []
  )

  // 🔥 SCROLL SUR 200 UNITÉS
  useFrame(({ camera }) => {
    if (groupRef.current) {
      const targetX = -scrollProgress * 200
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.1
      )
    }

    // caméra suit doucement
    const camTargetX = scrollProgress * 200 - 15
    cameraTargetRef.current.x = THREE.MathUtils.lerp(
      cameraTargetRef.current.x,
      camTargetX,
      0.05
    )

    camera.lookAt(cameraTargetRef.current)
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.4} color="#fff5e0" />
      <directionalLight position={[15, 15, 10]} intensity={1.2} color="#fff5e0" />
      <pointLight position={[-15, 8, 8]} intensity={0.8} color="#ffe1c0" />
      <pointLight position={[15, 8, 8]} intensity={0.8} color="#ffd1b3" />

      {/* Lampes ambiance */}
      {[-30, -20, -10, 0, 10, 20, 30].map((x, i) => (
        <group key={i} position={[x, 4.5, 0]}>
          <pointLight intensity={1.2} distance={12} color="#ffb366" />
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial emissive="#ff9933" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Couloir principal */}
      <group ref={groupRef}>
        {/* Mur → 200 unités */}
        <mesh position={[0, 0, -6]}>
          <planeGeometry args={[200, 18]} />
          <primitive object={materials.marbleMaterial} attach="material" />
        </mesh>

        {/* Sol → 200 unités */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 25]} />
          <primitive object={materials.floorMaterial} attach="material" />
        </mesh>

        {/* Plafond → 200 unités */}
        <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 25]} />
          <meshStandardMaterial color="#f5f0e6" />
        </mesh>

        {/* Décor */}
        <VersaillesDecor
          goldMaterial={materials.goldMaterial}
          marbleMaterial={materials.marbleMaterial}
        />

        {/* Tableaux */}
        {artworks.map((artwork) => (
          <ArtworkMesh
            key={artwork.id}
            artwork={artwork}
            position={artwork.position}
            onClick={() => onArtworkSelect(artwork)}
            goldMaterial={materials.goldMaterial}
            isAnimating={artworkAnimation?.id === artwork.id}
          />
        ))}
      </group>

      {/* Titre 3D */}
      <Float speed={1.5}>
        <Text
          position={[0, 5, 3]}
          fontSize={1.2}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
        >
          GALERIE ROYALE DE VERSAILLES
        </Text>
      </Float>
    </>
  )
}