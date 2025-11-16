import { NextResponse } from "next/server"
import OpenAI from "openai"
import { artworks } from "@/app/data/artworks"
import { Langfuse } from "langfuse"
const langfuse = new Langfuse({
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  baseUrl: process.env.LANGFUSE_BASE_URL!
})

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// 🔤 NORMALISE : enlève accents, met en minuscules
function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}

// 🎯 MATCH INTELLIGENT DU TABLEAU
async function smartMatch(text: string) {
  const q = normalize(text)

  // 1) match direct par titre exact
  let found = artworks.find(a => q.includes(normalize(a.title)))
  if (found) return found

  // 2) match par titre simplifié ou artiste
  for (const a of artworks) {
    const short = normalize(a.title.replace(/la |le |les |the /gi, "").trim())
    if (q.includes(short)) return a

    const artist = normalize(a.artist)
    if (q.includes(artist)) return a
  }

  // 3) match par "tableau numéro X"
  const num = q.match(/num[eé]ro\s+(\d+)/)
  if (num) {
    const idx = parseInt(num[1], 10)
    return artworks.find(a => a.order === idx)
  }

  // 4) GPT devine un titre
  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `Renvoie EXACTEMENT un titre parmi : ${artworks
          .map(a => `"${a.title}"`)
          .join(", ")} ou "null".`
      },
      { role: "user", content: text }
    ]
  })

  const out = res.output_text.trim()
  if (out === "null") return null

  return artworks.find(a => a.title === out)
}

// 🧠 CHATBOT PRINCIPAL
export async function POST(req: Request) {
  const { messages, artwork } = await req.json()
  const trace = langfuse.trace({
    name: "chatbot-interaction",
    input: messages
  })

  const last = messages[messages.length - 1].text.toLowerCase()
  let detectedAction = null

  // 🔢 Détection : premier, deuxième, numéro X
  const positionIntent = /(\bpremier\b|\bdeuxieme\b|\bdeuxième\b|\btroisieme\b|\btroisième\b|\bquatrieme\b|\bquatrième\b|\bcinquieme\b|\bcinquième\b|\bsixieme\b|\bsixième\b|\bnum[eé]ro\s+\d+)/
  if (positionIntent.test(last)) {
    let index = null

    if (last.includes("premier")) index = 1
    else if (last.includes("deuxieme") || last.includes("deuxième")) index = 2
    else if (last.includes("troisieme") || last.includes("troisième")) index = 3
    else if (last.includes("quatrieme") || last.includes("quatrième")) index = 4
    else if (last.includes("cinquieme") || last.includes("cinquième")) index = 5
    else if (last.includes("sixieme") || last.includes("sixième")) index = 6
    else {
      const m = last.match(/num[eé]ro\s+(\d+)/)
      if (m) index = parseInt(m[1], 10)
    }

    const target = artworks.find(a => a.order === index)

    if (target) {
      const response = NextResponse.json({
        output: `Le tableau numéro ${index} est « ${target.title} ». Tu veux que je te donne une description complète ?`,
        action: { type: "ZOOM_ARTWORK", artworkId: target.id }
      })
      detectedAction = { type: "ZOOM_ARTWORK", artworkId: target.id }
      langfuse.event({
        name: "chatbot-action",
        traceId: trace.id,
        metadata: { action: detectedAction }
      })
      return response
    }

    const response = NextResponse.json({
      output: `Je n’ai trouvé aucun tableau au numéro ${index}.`,
      action: null
    })
    langfuse.event({
      name: "chatbot-action",
      traceId: trace.id,
      metadata: { action: detectedAction }
    })
    return response
  }

  // 🖼️ Détection : "à gauche / à droite / à côté"
  const sideIntent =
    last.includes("à côté") ||
    last.includes("a cote") ||
    last.includes("à gauche") ||
    last.includes("a gauche") ||
    last.includes("à droite") ||
    last.includes("a droite")

  if (sideIntent) {
    const match = await smartMatch(normalize(last))

    if (match && match.order != null) {
      let target = null

      if (last.includes("gauche")) {
        target = artworks.find(a => a.order === match.order - 1)
      } else if (last.includes("droite")) {
        target = artworks.find(a => a.order === match.order + 1)
      } else {
        target = artworks.find(a => Math.abs(a.order - match.order) === 1)
      }

      if (target) {
        const response = NextResponse.json({
          output: `Le tableau à côté de « ${match.title} » est « ${target.title} ». Tu veux que je te donne une description complète ?`,
          action: { type: "ZOOM_ARTWORK", artworkId: target.id }
        })
        detectedAction = { type: "ZOOM_ARTWORK", artworkId: target.id }
        langfuse.event({
          name: "chatbot-action",
          traceId: trace.id,
          metadata: { action: detectedAction }
        })
        return response
      }

      const response = NextResponse.json({
        output: `Je connais « ${match.title} », mais il n’y a pas de tableau juste à côté.`,
        action: null
      })
      langfuse.event({
        name: "chatbot-action",
        traceId: trace.id,
        metadata: { action: detectedAction }
      })
      return response
    }
  }

  // 🔍 Détection intention zoom
  const zoomIntent =
    last.includes("agrandis") ||
    last.includes("zoom") ||
    last.includes("ouvre") ||
    last.includes("montre") ||
    last.includes("affiche")

  if (zoomIntent) {
    const match = await smartMatch(normalize(last))

    if (match) {
      detectedAction = { type: "ZOOM_ARTWORK", artworkId: match.id }

      const response = NextResponse.json({
        output: `Très bien, j’agrandis « ${match.title} ». Souhaites-tu une description complète ?`,
        action: detectedAction
      })
      langfuse.event({
        name: "chatbot-action",
        traceId: trace.id,
        metadata: { action: detectedAction }
      })
      return response
    }
  }

  // ✔ Si user dit oui = description
  const yes = ["oui", "yes", "ok", "vas y", "vas-y", "daccord", "d'accord"].includes(last.trim())

  if (yes && artwork) {
    return NextResponse.json({
      output: `Voici la description complète de « ${artwork.title} » :\n\n${artwork.description}`,
      action: null
    })
  }

  // 🤖 Réponse normale
  type ChatMessage = {
    from: "user" | "bot"
    text: string
  }

  const generation = trace.generation({
    name: "openai-generation",
    model: "gpt-4o-mini",
    input: messages
  })

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `
Tu es un guide virtuel du musée.
- Tu ne refuses jamais une action.
- Tu restes simple, humain et utile.
- Quand l’utilisateur demande un zoom, le backend le gère.
- Si l’utilisateur dit “oui”, tu donnes la description complète.
`
      },
      ...messages.map((m: ChatMessage) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text
      }))
    ]
  })

  // 🔹 Fin de génération Langfuse
  generation.end({
    output: response.output_text
  })

  // 🔹 Mise à jour du trace
  trace.update({
    output: response.output_text
  })

  // 🔹 Event final Langfuse
  langfuse.event({
    name: "chatbot-response",
    traceId: trace.id,
    output: response.output_text
  })

  return NextResponse.json({
    output: response.output_text,
    action: detectedAction
  })
}