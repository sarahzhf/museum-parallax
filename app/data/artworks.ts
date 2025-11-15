export interface Artwork {
  id: number
  title: string
  artist: string
  year: string
  period?: string
  style?: string
  description: string
  image: string
  technique?: string
  dimensions?: string
  location?: string
  position: [number, number, number]
}

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "La Nuit Étoilée",
    artist: "Vincent van Gogh",
    year: "1889",
    period: "Post-impressionnisme",
    style: "Post-impressionniste",
    description:
      "Une œuvre emblématique représentant un ciel nocturne tourbillonnant au-dessus d'un village endormi.",
    image: "images/starry-night.png",
    technique: "Huile sur toile",
    dimensions: "73.7 cm × 92.1 cm",
    location: "Museum of Modern Art, New York",
    position: [-10, 1, -4],
  },
  {
    id: 2,
    title: "La Joconde",
    artist: "Léonard de Vinci",
    year: "1503-1519",
    period: "Renaissance",
    style: "Renaissance italienne",
    description:
      "Le portrait le plus célèbre au monde, connu pour son sourire énigmatique.",
    image: "images/mona-lisa.png",
    technique: "Huile sur panneau de bois de peuplier",
    dimensions: "77 cm × 53 cm",
    location: "Musée du Louvre, Paris",
    position: [-28, -0.5, -4],
  },
  {
    id: 3,
    title: "Les Nymphéas",
    artist: "Claude Monet",
    year: "1919",
    period: "Impressionnisme",
    style: "Impressionniste",
    description:
      "Série de peintures impressionnistes représentant le jardin d'eau de Giverny.",
    image: "images/water-lilies.png",
    technique: "Huile sur toile",
    dimensions: "200 cm × 200 cm",
    location: "Musée de l'Orangerie, Paris",
    position: [-21, 1.5, -4],
  },
  {
    id: 4,
    title: "Guernica",
    artist: "Pablo Picasso",
    year: "1937",
    period: "Art moderne",
    style: "Cubisme",
    description:
      "Une œuvre puissante dénonçant les horreurs de la guerre civile espagnole.",
    image: "images/guernica.png",
    technique: "Huile sur toile",
    dimensions: "349.3 cm × 776.6 cm",
    location: "Museo Reina Sofía, Madrid",
    position: [-14, 0, -4],
  },
  {
    id: 5,
    title: "La Grande Vague",
    artist: "Katsushika Hokusai",
    year: "1831",
    period: "Période d'Edo",
    style: "Ukiyo-e",
    description:
      "Estampe japonaise iconique représentant une vague déferlante devant le mont Fuji.",
    image: "images/great-wave.png",
    technique: "Estampe sur bois",
    dimensions: "25.7 cm × 37.8 cm",
    location: "British Museum, Londres",
    position: [-7, -1, -4],
  },
  {
    id: 6,
    title: "La Persistance de la Mémoire",
    artist: "Salvador Dalí",
    year: "1931",
    period: "Surréalisme",
    style: "Surréaliste",
    description:
      "Œuvre surréaliste célèbre pour ses montres molles.",
    image: "images/persistence-memory.png",
    technique: "Huile sur toile",
    dimensions: "24 cm × 33 cm",
    location: "Museum of Modern Art, New York",
    position: [0, 1, -4],
  },
  {
    id: 7,
    title: "Le Cri",
    artist: "Edvard Munch",
    year: "1893",
    period: "Expressionnisme",
    style: "Expressionniste",
    description:
      "Expression puissante de l'angoisse existentielle.",
    image: "images/the-scream.png",
    technique: "Huile, tempera et pastel sur carton",
    dimensions: "91 cm × 73.5 cm",
    location: "Galerie nationale d'Oslo",
    position: [7, -0.5, -4],
  },
  {
    id: 8,
    title: "American Gothic",
    artist: "Grant Wood",
    year: "1930",
    period: "Réalisme américain",
    style: "Réalisme régional",
    description:
      "Portrait emblématique de l'Amérique rurale.",
    image: "images/american-gothic.png",
    technique: "Huile sur panneau de bois",
    dimensions: "78 cm × 65.3 cm",
    location: "Art Institute of Chicago",
    position: [14, 1.5, -4],
  },
  {
    id: 9,
    title: "La Jeune Fille à la Perle",
    artist: "Johannes Vermeer",
    year: "1665",
    period: "Âge d'or néerlandais",
    style: "Baroque néerlandais",
    description:
      "Portrait mystérieux et fascinant.",
    image: "images/girl-with-pearl.png",
    technique: "Huile sur toile",
    dimensions: "44.5 cm × 39 cm",
    location: "Mauritshuis, La Haye",
    position: [21, 0, -4],
  },
  {
    id: 10,
    title: "Les Demoiselles d'Avignon",
    artist: "Pablo Picasso",
    year: "1907",
    period: "Art moderne",
    style: "Proto-cubisme",
    description:
      "Œuvre révolutionnaire marquant la naissance du cubisme.",
    image: "images/demoiselles-avignon.png",
    technique: "Huile sur toile",
    dimensions: "243.9 cm × 233.7 cm",
    location: "Museum of Modern Art, New York",
    position: [28, -1, -4],
  },
  {
    id: 11,
    title: "La Création d'Adam",
    artist: "Michel-Ange",
    year: "1512",
    period: "Renaissance",
    style: "Renaissance italienne",
    description:
      "Fresque emblématique de la Chapelle Sixtine.",
    image: "images/creation-adam.png",
    technique: "Fresque",
    dimensions: "280 cm × 570 cm",
    location: "Chapelle Sixtine, Vatican",
    position: [35, 1, -4],
  },
  {
    id: 12,
    title: "La Liberté guidant le peuple",
    artist: "Eugène Delacroix",
    year: "1830",
    period: "Romantisme",
    style: "Romantique",
    description:
      "Allégorie de la Révolution de juillet 1830.",
    image: "images/liberty-leading.png",
    technique: "Huile sur toile",
    dimensions: "260 cm × 325 cm",
    location: "Musée du Louvre, Paris",
    position: [42, 0.5, -4],
  },
]