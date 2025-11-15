// app/data/gallery-knowledge.ts

export const galleryKnowledge = [
    {
      id: 1,
      title: "La Nuit Étoilée",
      artist: "Vincent van Gogh",
      year: "1889",
      style: "Post-impressionnisme",
      movement: "Expression émotionnelle, couleurs vibrantes",
      description: `
  Œuvre peinte depuis la fenêtre de l’asile de Saint-Rémy-de-Provence.
  Van Gogh ne copie pas la réalité : il peint son agitation intérieure.
  Le ciel est composé de grandes spirales lumineuses, comme vivantes.
  Les coups de pinceau tourbillonnants créent un mouvement constant.
  Le cyprès noir symbolise l’infini et la spiritualité.
  Le village est inventé : il n’existait pas dans le paysage réel.
  Ambiance : mystique, vibrante, presque cosmique.
  `,
      technical: `
  Huile sur toile – 73 × 92 cm.
  Superposition de couches épaisses (impasto).
  Couleurs contrastées bleu / jaune.
  `,
      symbolism: `
  Le ciel = chaos et beauté.
  Le cyprès = lien entre monde terrestre et céleste.
  Les étoiles = exaltation, vie intérieure.
  `,
      corridorPosition: -25,
      neighbors: ["La Grande Vague", "Les Nymphéas"],
    },
  
    {
      id: 2,
      title: "La Joconde",
      artist: "Léonard de Vinci",
      year: "1503",
      style: "Renaissance",
      movement: "Sfumato, réalisme, perspective atmosphérique",
      description: `
  Le portrait le plus célèbre du monde, connu pour son sourire mystérieux.
  Le sfumato crée des contours doux sans ligne nette.
  Le paysage brumeux derrière elle est imaginaire.
  Le regard semble suivre le spectateur.
  Le tableau a été volé en 1911, devenant un phénomène mondial.
  `,
      technical: `
  Huile sur panneau de peuplier – 77 × 53 cm.
  Plus de 20 couches transparentes.
  `,
      symbolism: `
  Sourire = ambiguïté humaine.
  Paysage = monde intérieur.
  `,
      corridorPosition: -20,
      neighbors: ["La Nuit Étoilée", "Les Nymphéas"],
    },
  
    {
      id: 3,
      title: "Les Nymphéas",
      artist: "Claude Monet",
      year: "1919",
      style: "Impressionnisme",
      movement: "Étude de la lumière",
      description: `
  Monet peint son étang à Giverny, sans horizon pour créer un effet infini.
  Reflets de lumière, eau, fleurs flottantes.
  Œuvre contemplative, atmosphérique.
  Peinte alors que Monet souffrait de cataracte.
  `,
      technical: `
  Huile sur toile – série de plus de 250 tableaux.
  Touches rapides, couleurs pastel.
  `,
      symbolism: `
  Fusion entre nature et émotion humaine.
  `,
      corridorPosition: -15,
      neighbors: ["La Joconde", "Guernica"],
    },
  
    {
      id: 4,
      title: "Guernica",
      artist: "Pablo Picasso",
      year: "1937",
      style: "Cubisme",
      movement: "Fragmentation, engagement politique",
      description: `
  Créé après le bombardement de Guernica.
  Le tableau ne montre pas une scène réaliste mais un cri visuel.
  Le cheval et le taureau sont des symboles récurrents chez Picasso.
  Le noir et blanc évoque les journaux et la mort.
  `,
      technical: `
  Peinture monumentale – 349 × 776 cm.
  Palette monochrome.
  `,
      symbolism: `
  Cheval = peuple blessé.
  Taureau = brutalité.
  Lampe = vérité / dénonciation.
  `,
      corridorPosition: -10,
      neighbors: ["Les Nymphéas", "La Grande Vague"],
    },
  
    {
      id: 5,
      title: "La Grande Vague de Kanagawa",
      artist: "Katsushika Hokusai",
      year: "1831",
      style: "Ukiyo-e",
      movement: "Gravure japonaise",
      description: `
  La vague semble vivante, prête à s'abattre sur les pêcheurs.
  Mont Fuji minuscule : calme contre chaos.
  Utilisation révolutionnaire du bleu de Prusse.
  `,
      technical: `
  Gravure sur bois – impression multiple.
  `,
      symbolism: `
  La nature immense face à l’homme.
  `,
      corridorPosition: -5,
      neighbors: ["Guernica", "La Persistance de la Mémoire"],
    },
  
    {
      id: 6,
      title: "La Persistance de la Mémoire",
      artist: "Salvador Dalí",
      year: "1931",
      style: "Surréalisme",
      movement: "Onirisme, déformation du temps",
      description: `
  Les montres molles symbolisent la relativité du temps.
  La figure molle est un autoportrait déformé.
  Le décor de Port Lligat est réel.
  `,
      technical: `
  24 × 33 cm seulement !
  Textures lisses, précises.
  `,
      symbolism: `
  Temps = illusion.
  Fourmis = décomposition.
  `,
      corridorPosition: 0,
      neighbors: ["La Grande Vague", "Le Cri"],
    },
  
    {
      id: 7,
      title: "Le Cri",
      artist: "Edvard Munch",
      year: "1893",
      style: "Expressionnisme",
      movement: "Distorsion émotionnelle",
      description: `
  Icône universelle de l'angoisse.
  Ciel rouge sang inspiré d’un vrai coucher de soleil volcanique.
  La figure est androgyne, humaine mais abstraite.
  `,
      technical: `
  Tempera et pastel.
  `,
      symbolism: `
  Le pont = distance avec le monde.
  Le cri = son intérieur.
  `,
      corridorPosition: 5,
      neighbors: ["La Persistance de la Mémoire", "American Gothic"],
    },
  
    {
      id: 8,
      title: "American Gothic",
      artist: "Grant Wood",
      year: "1930",
      style: "Régionalisme américain",
      description: `
  Portrait d’un fermier strict et de sa fille.
  Ambiguïté : critique ou hommage à l’Amérique rurale ?
  La fourche est parfaitement symétrique.
  `,
      technical: `
  Huile sur toile – 74 × 62 cm.
  `,
      symbolism: `
  Rigidité morale, traditions rurales.
  `,
      corridorPosition: 10,
      neighbors: ["Le Cri", "La Jeune Fille à la Perle"],
    },
  
    {
      id: 9,
      title: "La Jeune Fille à la Perle",
      artist: "Johannes Vermeer",
      year: "1665",
      style: "Baroque hollandais",
      description: `
  C’est un tronie : étude de visage, pas un portrait réel.
  La perle est peut-être en verre.
  Lumière douce typique de Vermeer.
  `,
      technical: `
  Huile sur toile.
  `,
      symbolism: `
  Innocence, douceur, intimité.
  `,
      corridorPosition: 15,
      neighbors: ["American Gothic", "Les Demoiselles d’Avignon"],
    },
  
    {
      id: 10,
      title: "Les Demoiselles d’Avignon",
      artist: "Pablo Picasso",
      year: "1907",
      style: "Proto-cubisme",
      description: `
  Œuvre révolutionnaire : naissance du cubisme.
  Visages inspirés de l’art africain.
  Composition agressive, sans profondeur classique.
  `,
      technical: `
  Grand format – 243 × 233 cm.
  `,
      symbolism: `
  Rupture avec la tradition.
  `,
      corridorPosition: 20,
      neighbors: ["La Jeune Fille à la Perle", "La Création d'Adam"],
    },
  
    {
      id: 11,
      title: "La Création d’Adam",
      artist: "Michel-Ange",
      year: "1508–1512",
      style: "Renaissance",
      description: `
  Fresque légendaire de la chapelle Sixtine.
  Les doigts presque touchants : naissance de l’humanité.
  Les anges forment la forme d’un cerveau humain (interprétation célèbre).
  `,
      technical: `
  Fresque sur plafond.
  `,
      symbolism: `
  Lien entre divin et humain.
  `,
      corridorPosition: 25,
      neighbors: ["Les Demoiselles d’Avignon", "La Liberté guidant le peuple"],
    },
  
    {
      id: 12,
      title: "La Liberté guidant le peuple",
      artist: "Eugène Delacroix",
      year: "1830",
      style: "Romantisme",
      description: `
  Représente l’insurrection française de juillet 1830.
  La Liberté est une femme réelle, du peuple.
  Beaucoup de diagonales : énergie, révolution.
  `,
      technical: `
  Huile sur toile – 260 × 325 cm.
  `,
      symbolism: `
  Liberté, justice, lutte populaire.
  `,
      corridorPosition: 30,
      neighbors: ["La Création d'Adam"],
    },
  ]