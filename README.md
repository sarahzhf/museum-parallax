 Museum Parallax (AI-Enhanced Virtual Art Gallery)

 Overview

Versailles Museum Parallax is an immersive 3D virtual art gallery built with
Next.js + React Three Fiber + OpenAI GPT.
Users can walk through a gallery, view paintings, and interact with a virtual AI guide capable of:
	•	identifying artworks
	•	describing them
	•	zooming on request
	•	locating paintings by left/right/next
	•	answering questions naturally

The AI guide is connected to Langfuse, providing full MLOps observability, production monitoring, and trace visualization.


 Features

3D Gallery
	•	Full interactive scene in React Three Fiber
	•	Smooth camera movement
	•	Dynamic artworks with position + metadata
	•	Zoom-in animations

 AI Virtual Guide (Chatbot)
	•	Smart artwork detection
	•	Natural conversation
	•	“Zoom this artwork” → triggers backend action
	•	“What is the painting next to the Mona Lisa?” → detection + response
	•	Multi-step dialogue with memory

 Smart Reasoning Pipeline
	•	Custom smartMatch() algorithm
	•	Fuzzy title matching
	•	Artist recognition
	•	Automatic fallback to GPT

 MLOps Monitoring (Langfuse)

Fully integrated observability for local AND production:
	•	Traces (full conversation view)
	•	Spans (smartMatch, OpenAI calls…)
	•	Events (zoom, left/right navigation, user actions)
	•	Inputs / outputs logged
	•	Errors captured

Everything is tracked both locally AND on Vercel deployment.



Technologies
	•	Next.js 15
	•	React Three Fiber
	•	OpenAI API
	•	Langfuse (monitoring & MLOps)
	•	Typescript
	•	Vercel Deployment



 Installation & Setup

1️ Clone the project

git clone <repo-url>
cd museum-parallax

2️ Install dependencies

npm install

If you have peer dependency conflicts:

npm install --legacy-peer-deps

3️ Add environment variables

Create .env.local :

OPENAI_API_KEY=sk-xxxx
LANGFUSE_SECRET_KEY=lfsk_xxx
LANGFUSE_PUBLIC_KEY=lfpk_xxx
LANGFUSE_BASE_URL=https://cloud.langfuse.com

 About Langfuse in Production

To enable MLOps monitoring on Vercel, add the same keys in:

Vercel → Project → Settings → Environment Variables

Your chatbot will then be monitored in real-time on Langfuse, even for users on the deployed website.


▶️ Run Locally

npm run dev

Visit:
👉 http://localhost:3000

 Deployment

Deploy automatically with Vercel:
	•	Every commit to main triggers a deployment
	•	Environment variables must be added manually in Vercel
	•	Once deployed, all AI interactions are logged in Langfuse

 MLOps Integration (Langfuse)

 What is logged?

For every user message:
	•	A trace is created
	•	A generation span for the OpenAI call
	•	An event if the user asks to zoom / left / right
	•	A chatbot-response event with output
	•	A full timeline of user queries


 Project File Structure

app/
 ├─ api/
 │   └─ chat/route.ts      # AI logic + Langfuse monitoring
 ├─ components/
 │   ├─ gallery-3d.tsx
 │   ├─ artwork-mesh.tsx
 │   └─ chatbot.tsx
 ├─ data/
 │   └─ artworks.ts
 └─ page.tsx
public/
 └─ images/


 route.ts (AI + Langfuse)

All AI reasoning and MLOps logging happens here:
	•	Smart artwork matching
	•	Direction detection (left/right/next to…)
	•	Zoom detection
	•	Description logic
	•	Trace creation
	•	Span recording
	•	Event logging





