"use client"
import type * as THREE from "three"

interface VersaillesDecorProps {
  goldMaterial: THREE.Material
  marbleMaterial: THREE.Material
}

export default function VersaillesDecor({ goldMaterial, marbleMaterial }: VersaillesDecorProps) {
  // Créer des moulures et décorations style Versailles
  return (
    <>
      {/* Moulures dorées au plafond */}
      <group position={[0, 4.9, 0]}>
        {[-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.5, 10, 0.2]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
        ))}

        {[-5, -2.5, 0, 2.5, 5].map((z, i) => (
          <mesh key={i} position={[0, 0, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <boxGeometry args={[0.5, 50, 0.2]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Colonnes corinthiennes */}
      {[-20, -10, 0, 10, 20].map((x, i) => (
        <group key={i} position={[x, -4, -4.5]}>
          {/* Base de la colonne */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1.5, 1, 1.5]} />
            <primitive object={marbleMaterial} attach="material" />
          </mesh>

          {/* Fût de la colonne */}
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 8, 16]} />
            <primitive object={marbleMaterial} attach="material" />
          </mesh>

          {/* Chapiteau */}
          <mesh position={[0, 8.5, 0]}>
            <boxGeometry args={[1.2, 0.8, 1.2]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Moulures dorées sur les murs */}
      <group position={[0, 0, -4.9]}>
        {/* Cadre horizontal supérieur */}
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[50, 0.3, 0.1]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>

        {/* Cadre horizontal inférieur */}
        <mesh position={[0, -3, 0]}>
          <boxGeometry args={[50, 0.3, 0.1]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>

        {/* Cadres verticaux */}
        {[-22.5, -17.5, -12.5, -7.5, -2.5, 2.5, 7.5, 12.5, 17.5, 22.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.3, 6, 0.1]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Lustres ornés */}
      {[-15, 0, 15].map((x, i) => (
        <group key={i} position={[x, 3, 0]}>
          {/* Structure principale du lustre */}
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>

          {/* Branches du lustre */}
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, j) => (
            <group key={j} rotation={[0, 0, angle]}>
              <mesh position={[0.8, -0.8, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
                <primitive object={goldMaterial} attach="material" />
              </mesh>

              {/* Bougie */}
              <mesh position={[1.2, -1.2, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
                <meshStandardMaterial color="#f5f5f0" />
              </mesh>

              {/* Flamme */}
              <pointLight position={[1.2, -0.9, 0]} intensity={0.5} distance={3} decay={2} color="#ffb366" />
              <mesh position={[1.2, -0.9, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#ffb366" emissive="#ff9933" emissiveIntensity={1} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Miroirs ornés */}
      {[-18, -6, 6, 18].map((x, i) => (
        <group key={i} position={[x, 0, -4.8]}>
          {/* Cadre doré */}
          <mesh>
            <boxGeometry args={[3, 5, 0.2]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>

          {/* Surface du miroir */}
          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[2.6, 4.6, 0.05]} />
            <meshPhysicalMaterial
              color="#e0e0e0"
              metalness={0.9}
              roughness={0.1}
              reflectivity={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}
