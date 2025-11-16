Versailles — Musée 3D Parallax

Une expérience immersive de galerie d’art en 3D avec navigation parallax, détails interactifs et guide virtuel intelligent.

Ce projet propose un musée virtuel entièrement en 3D, conçu en Next.js + React + Three.js, avec un chatbot IA intégré capable :
	•	d’expliquer les tableaux
	•	d’identifier une œuvre même si l’utilisateur ne connaît pas son nom
	•	de reconnaître :
	•	« agrandis La Joconde »
	•	« c’est quoi le tableau numéro 4 ? »
	•	« celui à gauche de Guernica »
	•	« le tableau à côté de la Joconde »
	•	de zoomer automatiquement sur l’œuvre demandée
	•	de donner une description complète sur demande
	•	de répondre naturellement, comme un vrai guide humain

Fonctionnalités principales

🔹 Galerie 3D immersive
	•	Navigation parallax fluide (scroll → mouvement latéral dans la galerie)
	•	Cadres et tableaux correctement positionnés
	•	Caméra dynamique qui suit le déplacement
	•	Animation d’agrandissement lorsqu’on clique sur un tableau
	•	Modale détaillée avec description et informations artistiques

🔹 Chatbot guide virtuel (IA)

Propulsé par OpenAI GPT-4o-mini, il peut :
	•	reconnaître exactement un tableau grâce à smartMatch
	•	comprendre les positions relatives :
	•	« à gauche »
	•	« à droite »
	•	« à côté »
	•	« premier tableau », « numéro 3 », etc.
	•	envoyer une action ZOOM_ARTWORK au front
	•	gérer des réponses humaines et naturelles

🔹 Gestion intelligente des tableaux

Chaque œuvre dans artworks.ts possède :

order: number

Ce qui permet au chatbot de comprendre :

Commande utilisateur	Réaction
« le tableau numéro 2 »	Affiche Les Nymphéas
« à côté de la Joconde »	Cherche ordre 1 → donne ordre 2
« à droite de Guernica »	Cherche ordre 3 → retourne ordre 4
« agrandis la vague »	Agrandit automatiquement La Grande Vague



📁 Structure du projet

museum-parallax/
 ├─ app/
 │   ├─ api/chat/route.ts    → logique du chatbot IA
 │   ├─ components/
 │   │   ├─ gallery-3d.tsx   → scène 3D principale
 │   │   ├─ artwork-mesh.tsx → affichage physique d’un tableau en 3D
 │   │   ├─ chatbot.tsx      → interface utilisateur du chatbot
 │   ├─ data/artworks.ts     → liste et positions des œuvres
 │   ├─ page.tsx             → page principale + canvas 3D
 ├─ public/images/           → images des œuvres
 ├─ README.md



⚙️ Installation & Lancement

1️⃣ Cloner le projet

git clone https://github.com/sarahzhf/museum-parallax.git
cd museum-parallax

2️⃣ Installer les dépendances

npm install

3️⃣ Ajouter la clé OpenAI

Crée un fichier :

.env.local

Avec :

OPENAI_API_KEY=ta_clef_ici

4️⃣ Lancer le projet

npm run dev

Le musée sera accessible ici :
👉 http://localhost:3000



🚀 Déploiement (Vercel)

1) Push sur GitHub

git add .
git commit -m "update"
git push origin main

2) Vercel rebuild automatiquement
	•	pas besoin de refaire quoi que ce soit
	•	dès que tu pushes → ton site public se met à jour


➕ Ajouter un nouveau tableau
	1.	Ajouter l’image dans public/images/
	2.	Ajouter une entrée dans artworks.ts :

{
  id: 13,
  title: "Nom du tableau",
  artist: "Artiste",
  year: "Année",
  description: "Description...",
  image: "images/mon-image.png",
  position: [x, y, z],
  order: 13
}

	3.	Push → Vercel déploie automatiquement.


🧠 Tech utilisées
	•	Next.js 14
	•	React
	•	React Three Fiber
	•	Drei
	•	TypeScript
	•	OpenAI GPT-4o-mini
	•	Vercel






