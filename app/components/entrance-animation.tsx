"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface EntranceAnimationProps {
  onComplete: () => void
}

export default function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 0) {
        setStep(1)
      } else if (step === 1) {
        setStep(2)
      } else if (step === 2) {
        onComplete()
      }
    }, step === 0 ? 3000 : 2000)

    return () => clearTimeout(timer)
  }, [step, onComplete])

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black z-50 overflow-hidden flex items-center justify-center">

      {/* ÉCRAN TITRE */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          <h1 className="text-8xl md:text-9xl font-light text-white mb-8 tracking-wider">
            VERSAILLES
          </h1>

          <h2 className="text-4xl md:text-6xl font-light text-gold mb-6">
            Galerie Royale d'Art
          </h2>

          <p className="text-2xl text-white/80">
            Une expérience immersive à travers les chefs-d'œuvre
          </p>
        </motion.div>
      )}

      {/* ANIMATION SIMPLIFIÉE */}
      {step === 1 && (
        <motion.div
          className="text-3xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Les portes s'ouvrent...
        </motion.div>
      )}

      {/* FIN */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-gold text-3xl"
        >
          Bienvenue dans la Galerie Royale
        </motion.div>
      )}

    </div>
  )
}