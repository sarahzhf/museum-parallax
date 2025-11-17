Virtual Museum Guide (Generative AI Project)

1. Introduction

This project is an innovative virtual museum experience combining immersive 3D navigation and a generative AI assistant.
Users can explore a realistic art gallery and interact with a virtual guide able to identify artworks, answer questions, provide descriptions, and trigger actions such as zooming on a painting.

The objective of this project is to demonstrate the practical use of generative AI models, prompt engineering, backend logic, monitoring tools, and good development practices.


2. Project Features

2.1 3D Immersive Museum
	•	Built with React Three Fiber (WebGL).
	•	Interactive environment with a progressive navigation bar.
	•	High-quality framed artworks positioned in 3D space.
	•	Responsive layout and smooth transitions.

2.2 Generative AI Chatbot
	•	Powered by OpenAI GPT-4o-mini.
	•	Understands natural language requests.
	•	Identifies paintings using a hybrid approach:
	•	local metadata matching,
	•	positional reasoning (first, second, left of, right of),
	•	fallback to model inference when needed.
	•	Can trigger actions such as zooming on a painting.
	•	Provides detailed descriptions of each artwork.

2.3 Smart Artwork Matching System
	•	Normalization pipeline to handle accents and variations.
	•	Keyword extraction for titles and artists.
	•	Positional matching using artwork order.
	•	Fallback to LLM classification for ambiguous queries.

2.4 MLOps and Observability with Langfuse
	•	Full integration of Langfuse to monitor:
	•	requests,
	•	traces,
	•	model generations,
	•	actions triggered by the user.
	•	All interactions from both local development and Vercel deployment are logged.
	•	Each API call is associated with a Langfuse trace and events for analysis.

2.5 Deployment
	•	Application deployed on Vercel.
	•	API routes handled through Next.js Server Functions.


3. Technologies Used

Frontend
	•	React
	•	Next.js
	•	React Three Fiber
	•	Drei utilities
	•	TailwindCSS

Backend
	•	Next.js API routes
	•	OpenAI API
	•	Langfuse monitoring

Storage
	•	Local JSON-based metadata for artworks
	•	Static image hosting in /public


4. Project Structure

app/
  api/
    chat/
      route.ts        → chatbot logic, Langfuse tracing, OpenAI responses
  components/
    gallery-3d.tsx    → 3D museum environment
    artwork-mesh.tsx  → rendering of each artwork in 3D
    chatbot.tsx       → frontend chat interface
  data/
    artworks.ts       → metadata and positions of all artworks
public/
  images/             → artwork images
.env.local            → API keys (OpenAI, Langfuse)


5. Installation and Setup

5.1 Requirements
	•	Node.js (v18 or higher)
	•	An OpenAI API key
	•	A Langfuse project (public and secret keys)

5.2 Clone the repository

git clone <repository-url>
cd museum-parallax

5.3 Install dependencies

npm install

5.4 Environment configuration

Create a .env.local file at the project root:

OPENAI_API_KEY=your_key
LANGFUSE_SECRET_KEY=your_key
LANGFUSE_PUBLIC_KEY=your_key
LANGFUSE_BASE_URL=https://cloud.langfuse.com

5.5 Start local server

npm run dev

The application will be available at http://localhost:3000.


6. How the Chatbot Works
	1.	The user sends a message.
	2.	The backend normalizes the text and runs several detection rules:
	•	numerical intent (“first painting”, “number 3”)
	•	spatial intent (“left of the Mona Lisa”, “next to”)
	•	direct title or artist name matching
	3.	The system selects the right artwork or falls back to OpenAI classification.
	4.	Langfuse logs:
	•	a trace containing the full conversation
	•	events for each triggered action
	•	a generation record for the LLM call
	5.	The backend returns:
	•	a natural-language response
	•	an optional action (zoom)


7. Deployment on Vercel

The project is deployed on Vercel:
	•	Automatic deployment triggered by GitHub pushes
	•	Environment variables configured in Vercel Dashboard
	•	Langfuse logs both local and production interactions


8. Limitations and Improvements

Current limitations
	•	Only a single room is implemented.
	•	No audio guide yet.
	•	No multi-modal analysis (image uploads) for now.

Possible future improvements
	•	Adding multiple rooms with navigation
	•	Voice-based interaction
	•	Enhanced artwork clustering and suggestions





