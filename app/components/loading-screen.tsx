"use client"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999] pointer-events-none">
      <div className="flex flex-col items-center justify-center text-white pointer-events-auto">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-light">Chargement...</p>
      </div>
    </div>
  )
}