import { NextResponse } from "next/server"
import OpenAI from "openai"
import { artworks } from "@/app/data/artworks"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// 🔤 NORMALISE : enlève accents, met en minuscules
function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}

// 🎯 MATCH INTELLIGENT DU TABLEAU
async function smartMatch(text: string) {
  const q = normalize(text)

  // 1) match direct par mot-clé
  let found = artworks.find(a => q.includes(normalize(a.title)))
  if (found) return found

  // 2) GPT devine
  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `Tu renvoies STRICTEMENT un titre parmi : ${artworks
          .map(a => `"${a.title}"`)
          .join(", ")}  
Si aucun ne correspond exactement → renvoie "null".`,
      },
      { role: "user", content: text },
    ],
  })

  const out = res.output_text.trim()
  if (out === "null") return null

  return artworks.find(a => a.title === out)
}

// 🧠 CHATBOT PRINCIPAL
export async function POST(req: Request) {
  const { messages, artwork } = await req.json()

  const last = messages[messages.length - 1].text.toLowerCase()
  let detectedAction = null

 
  const zoomIntent =
    last.includes("agrandis") ||
    last.includes("zoom") ||
    last.includes("ouvre") ||
    last.includes("montre") ||
    last.includes("affiche")

  if (zoomIntent) {
    const match = await smartMatch(last)

    if (match) {
      detectedAction = { type: "ZOOM_ARTWORK", artworkId: match.id }

      return NextResponse.json({
        output: `Très bien, j’agrandis « ${match.title} ».  
Souhaites-tu une description complète ?`,
        action: detectedAction,
      })
    }
  }

 
  const yes = ["oui", "yes", "ok", "vas y", "vas-y", "daccord", "d'accord"]
    .includes(last.trim())

  if (yes && artwork) {
    return NextResponse.json({
      output: `Voici la description complète de « ${artwork.title} » :\n\n${artwork.description}`,
      action: null,
    })
  }



  type ChatMessage = {
    from: "user" | "bot"
    text: string
  }

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `
Tu es un guide virtuel d’un musée 3D interactif.

RÈGLES IMPORTANTES :
- Ne jamais dire “je ne peux pas agrandir des images”.
- Si l’utilisateur demande un zoom/agrandissement, laisse le backend gérer. Tu ne refuses JAMAIS.
- Tu restes toujours utile, poli et simple.
- Si l’utilisateur répond “oui” après une proposition de description → tu donnes immédiatement la description complète.
- Tu parles de manière naturelle, humaine, concise.
        `,
      },
      ...messages.map((m: ChatMessage) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ],
  })

  return NextResponse.json({
    output: response.output_text,
    action: detectedAction,
  })
}