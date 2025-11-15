"use client"

import { useEffect, useState } from "react"
import { Send, MessageCircle } from "lucide-react"
import type { Artwork } from "./artwork-mesh"

interface ChatbotProps {
  selectedArtwork: Artwork | null
  autoMessage: string | null
  onAction: (action: any) => void
}

export default function Chatbot({ selectedArtwork, autoMessage, onAction }: ChatbotProps) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Bonjour ! Je suis votre guide virtuel.",
    },
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // message auto de page.tsx
  useEffect(() => {
    if (!autoMessage) return
    sendMessage(autoMessage, true)
  }, [autoMessage])

  const sendMessage = async (text: string, isAuto = false) => {
    if (!text.trim()) return
  
    const newMessages = [
      ...messages,
      ...(isAuto ? [] : [{ from: "user", text }])
    ]
  
    if (!isAuto) {
      setMessages(newMessages)
      setInput("")
    }
  
    setLoading(true)
  
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newMessages,   
        artwork: selectedArtwork,
      }),
    })
  
    const data = await res.json()
  
    if (data.action) {
      onAction(data.action)
    }
  
    setMessages(m => [...m, { from: "bot", text: data.output }])
    setLoading(false)
  }

  return (
    <>
      {/* Bouton flottant pour ouvrir/fermer */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[60] bg-gold text-black p-4 rounded-full shadow-xl pointer-events-auto"
      >
        <MessageCircle size={22} />
      </button>

      {/* Chatbox */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 z-[50] pointer-events-auto">
          <div className="bg-black/80 text-white rounded-2xl p-4 border border-gold/30">
            
            <h3 className="text-lg font-light text-gold mb-3">Guide Virtuel</h3>

            <div className="h-64 overflow-y-auto mb-4 space-y-2 p-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-gold text-black self-end max-w-[80%]"
                      : "bg-white/10 self-start max-w-[90%]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && <div className="italic text-white/60">Le guide réfléchit…</div>}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Pose une question..."
                className="flex-1 bg-white/10 border border-gold/20 rounded-xl px-3 py-2 text-sm"
              />
              
              <button
                onClick={() => sendMessage(input)}
                className="bg-gold text-black rounded-xl px-3 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}