"use client"

import { useRef, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface MarbleDoorsProps {
  isOpen: boolean
}

export default function MarbleDoors({ isOpen }: MarbleDoorsProps) {
  const leftDoorRef = useRef<THREE.Group>(null)
  const rightDoorRef = useRef<THREE.Group>(null)
  const targetRotation = useRef(0)

  // Matériaux créés UNE SEULE FOIS
  const materials = useMemo(() => ({
    marble: new THREE.MeshStandardMaterial({
      color: "#f8f8ff",
      metalness: 0.1,
      roughness: 0.6,
    }),
    gold: new THREE.MeshStandardMaterial({
      color: "#d4af37",
      metalness: 0.9,
      roughness: 0.1,
      emissive: "#332200",
      emissiveIntensity: 0.3,
    }),
  }), [])

  // Mise à jour rotation cible
  useEffect(() => {
    targetRotation.current = isOpen ? -Math.PI / 2 : 0
  }, [isOpen])

  // Animation
  useFrame(() => {
    if (!leftDoorRef.current || !rightDoorRef.current) return

    leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
      leftDoorRef.current.rotation.y,
      targetRotation.current,
      0.02
    )

    rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
      rightDoorRef.current.rotation.y,
      -targetRotation.current,
      0.02
    )
  })

  // Sous-composant panneau
  function DoorPanel({ rotation = [0, 0, 0] }: { rotation?: [number, number, number] }) {
    return (
      <group rotation={rotation}>
        <mesh>
          <boxGeometry args={[4, 8, 0.3]} />
          <meshStandardMaterial {...materials.marble} />
        </mesh>

        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[3.6, 7.6, 0.05]} />
          <meshStandardMaterial {...materials.gold} />
        </mesh>

        {[2, 0, -2].map((y, i) => (
          <mesh key={i} position={[0, y, 0.2]}>
            <boxGeometry args={[2.5, 1.5, 0.1]} />
            <meshStandardMaterial {...materials.gold} />
          </mesh>
        ))}

        <mesh position={[1.5, 0, 0.25]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial {...materials.gold} />
        </mesh>

        <mesh position={[1.5, 0, 0.4]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial {...materials.gold} />
        </mesh>
      </group>
    )
  }

  return (
    <>
      {/* Mur arrière */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial {...materials.marble} />
      </mesh>

      {/* Encadrement */}
      <mesh position={[0, 4.2, -1.8]}>
        <boxGeometry args={[10, 0.4, 0.5]} />
        <meshStandardMaterial {...materials.gold} />
      </mesh>

      <mesh position={[-4.2, 0, -1.8]}>
        <boxGeometry args={[0.4, 8, 0.5]} />
        <meshStandardMaterial {...materials.gold} />
      </mesh>

      <mesh position={[4.2, 0, -1.8]}>
        <boxGeometry args={[0.4, 8, 0.5]} />
        <meshStandardMaterial {...materials.gold} />
      </mesh>

      {/* Porte gauche */}
      <group ref={leftDoorRef} position={[-2, 0, -1.5]}>
        <DoorPanel />
      </group>

      {/* Porte droite */}
      <group ref={rightDoorRef} position={[2, 0, -1.5]}>
        <DoorPanel rotation={[0, Math.PI, 0]} />
      </group>

      {/* Light */}
      <spotLight
        position={[0, 6, 2]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#fff5e0"
      />
    </>
  )
}