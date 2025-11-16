"use client"

import { useGLTF } from "@react-three/drei"

export default function Statue(props: any) {
  const { scene } = useGLTF("/models/david.glb")

  return (
    <primitive
      object={scene}
      {...props}
      scale={[0.04, 0.04, 0.04]} // Taille réaliste pour ta galerie
    />
  )
}

useGLTF.preload("/models/david.glb")