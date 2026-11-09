const locations = [
  {
    id: 1,
    name: "Porto de Eldoria",
    icon: "⚓",
    region: "Eldoria",
    description:
      "Uma antiga cidade portuária cercada pelo mar e por histórias esquecidas.",
    difficulty: 1,

    npc: {
      name: "Capitão Rowan",
      icon: "🧔🏻‍♂️",
      role: "CAPITÃO DO PORTO",
      dialogue:
        "Então você é quem encontrou o mapa... Há séculos ninguém procura pelos Fragmentos da Coroa Abissal. Se quiser sobreviver, vai precisar aprender a ler os sinais.",
    },

    guardian: {
      name: "Crabbe",
      icon: "🦀",
      role: "GUARDIÃO DO PORTO",
    },

    treasure: {
      name: "Bússola de Eldoria",
      icon: "🧭",
      description:
        "Uma antiga bússola que não aponta para o norte. Dizem que ela aponta para aquilo que o coração procura.",
    },

    fragment: {
      name: "Fragmento da Maré",
      icon: "💎",
      number: 1,
    },

    clue: "LESTE",

    clueDescription:
      "A bússola não aponta para o norte. Ela aponta para onde o sol nasce.",
  },

  {
    id: 2,
    name: "Reino dos Corais",
    icon: "🪸",
    region: "Águas Profundas",
    description:
      "Um reino submerso repleto de corais, criaturas mágicas e ruínas antigas.",
    difficulty: 2,

    npc: {
      name: "Nerissa",
      icon: "🧜‍♀️",
      role: "GUARDIÃ DOS CORAIS",
      dialogue:
        "As águas lembram de coisas que os humanos esqueceram. Talvez os Fragmentos estejam mais perto do que você imagina.",
    },

    guardian: {
      name: "Octavius",
      icon: "🐙",
      role: "GUARDIÃO DAS ÁGUAS",
    },

    treasure: {
      name: "Cristal da Maré",
      icon: "🔮",
      description:
        "Um cristal azul encontrado no coração dos corais. Ele parece pulsar como se tivesse vida própria.",
    },

    fragment: {
      name: "Fragmento das Águas",
      icon: "💎",
      number: 2,
    },

    clue: "ABISMO",

    clueDescription:
      "Procure aquilo que sobrevive mesmo quando tudo desaparece.",
  },

  {
    id: 3,
    name: "Ilha de Vulkar",
    icon: "🌋",
    region: "Terras de Fogo",
    description:
      "Uma ilha vulcânica onde o fogo e o oceano disputam o mesmo território.",
    difficulty: 3,

    npc: {
      name: "Kaedra",
      icon: "🔥",
      role: "GUARDIÃ DA FORJA",
      dialogue:
        "Somente aqueles que dominam o conhecimento conseguem atravessar as chamas de Vulkar.",
    },

    guardian: {
      name: "Ignivar",
      icon: "🐉",
      role: "GUARDIÃO DO FOGO",
    },

    treasure: {
      name: "Fragmento da Forja",
      icon: "🔥",
      description:
        "Uma pedra incandescente criada pelas antigas forças da ilha.",
    },

    fragment: {
      name: "Fragmento da Forja",
      icon: "💎",
      number: 3,
    },

    clue: "VII",

    clueDescription:
      "Sete mares foram atravessados. Mas apenas um caminho permanece aberto.",
  },

  {
    id: 4,
    name: "Floresta de Nymora",
    icon: "🌳",
    region: "Terras Encantadas",
    description:
      "Uma floresta mágica onde criaturas antigas observam cada passo dos aventureiros.",
    difficulty: 4,

    npc: {
      name: "Elyra",
      icon: "🧚‍♀️",
      role: "GUARDIÃ DA FLORESTA",
      dialogue:
        "A floresta não pertence aos humanos. Caminhe com cuidado e talvez ela permita que você descubra seus segredos.",
    },

    guardian: {
      name: "Sylvara",
      icon: "🦌",
      role: "GUARDIÃ DA VIDA",
    },

    treasure: {
      name: "Semente Ancestral",
      icon: "🌱",
      description:
        "Uma pequena semente que carrega a energia das antigas criaturas da floresta.",
    },

    fragment: {
      name: "Fragmento da Vida",
      icon: "💎",
      number: 4,
    },

    clue: "CENTRO",

    clueDescription:
      "Não procure acima. Não procure abaixo. Procure onde ambos se encontram.",
  },

  {
    id: 5,
    name: "Montanhas do Leviatã",
    icon: "🐋",
    region: "Montanhas Abissais",
    description:
      "Gigantescas montanhas cercadas por águas profundas onde vive uma criatura lendária.",
    difficulty: 5,

    npc: {
      name: "Orin",
      icon: "🧙‍♂️",
      role: "SÁBIO DAS MONTANHAS",
      dialogue:
        "O Leviatã não é seu inimigo. Ele apenas protege aquilo que os homens tentaram roubar.",
    },

    guardian: {
      name: "Leviatã",
      icon: "🐋",
      role: "GUARDIÃO DAS PROFUNDEZAS",
    },

    treasure: {
      name: "Pérola Lunar",
      icon: "🌕",
      description:
        "Uma pérola prateada que brilha intensamente quando a lua aparece no céu.",
    },

    fragment: {
      name: "Fragmento Lunar",
      icon: "💎",
      number: 5,
    },

    clue: "SOMBRA",

    clueDescription:
      "Quando a lua tocar o mar, siga aquilo que permanece sem luz.",
  },

  {
    id: 6,
    name: "Abismo Negro",
    icon: "🌑",
    region: "Profundezas do Oceano",
    description:
      "Um lugar onde a luz desaparece e antigos segredos permanecem escondidos.",
    difficulty: 6,

    npc: {
      name: "A Voz",
      icon: "👁️",
      role: "ENTIDADE DESCONHECIDA",
      dialogue:
        "Você chegou longe demais. Mas talvez ainda não tenha percebido quem realmente está observando você.",
    },

    guardian: {
      name: "Rei Afogado",
      icon: "💀",
      role: "GUARDIÃO DO ABISMO",
    },

    treasure: {
      name: "Olho do Abismo",
      icon: "👁️",
      description:
        "Um artefato misterioso capaz de revelar aquilo que permanece escondido nas sombras.",
    },

    fragment: {
      name: "Fragmento do Abismo",
      icon: "💎",
      number: 6,
    },

    clue: "OBSERVE",

    clueDescription:
      "O verdadeiro inimigo nunca foi aquele que guardava o tesouro. Observe aquilo que as sombras tentam esconder.",
  },

  {
    id: 7,
    name: "Templo da Rainha",
    icon: "🏛️",
    region: "Santuário Abissal",
    description:
      "O templo perdido onde a verdade sobre a Coroa Abissal finalmente será revelada.",
    difficulty: 7,

    finalRegion: true,

    npc: {
      name: "Rainha das Marés",
      icon: "👑",
      role: "SENHORA DO OCEANO",
      dialogue:
        "Você percorreu um caminho que poucos tiveram coragem de seguir. Agora chegou a hora de descobrir a verdadeira história da Coroa Abissal.",
    },

    guardian: {
      name: "Sentinela Abissal",
      icon: "🛡️",
      role: "GUARDIÃO DO TEMPLO",
    },

    treasure: {
      name: "Coroa Abissal",
      icon: "👑",
      description:
        "A lendária Coroa Abissal. Seu poder é muito maior do que qualquer tesouro de ouro.",
    },

    fragment: {
      name: "Fragmento da Coroa",
      icon: "💎",
      number: 7,
    },

    clue: "A VERDADE",

    clueDescription:
      "Você já possui o caminho. Agora precisa compreender aquilo que os sete fragmentos estavam tentando revelar.",
  },
];


/*
=========================================
ENIGMA FINAL
=========================================
*/

const finalRiddle = {
  title: "O ÚLTIMO SEGREDO",
  description:
    "Os sete fragmentos finalmente estão reunidos. As palavras encontradas durante sua jornada precisam ser interpretadas para revelar o caminho até a Coroa Abissal.",

  fragments: [
    {
      number: 1,
      word: "LESTE",
    },
    {
      number: 2,
      word: "ABISMO",
    },
    {
      number: 3,
      word: "VII",
    },
    {
      number: 4,
      word: "CENTRO",
    },
    {
      number: 5,
      word: "SOMBRA",
    },
    {
      number: 6,
      word: "OBSERVE",
    },
    {
      number: 7,
      word: "A VERDADE",
    },
  ],

  question:
    "O que os fragmentos estão tentando revelar?",

  options: [
    {
      id: "a",
      text: "Um tesouro escondido em uma ilha distante.",
    },
    {
      id: "b",
      text: "O caminho para o centro do Abismo.",
    },
    {
      id: "c",
      text: "A verdadeira história da Coroa Abissal.",
    },
    {
      id: "d",
      text: "A localização do antigo navio de Eldoria.",
    },
  ],

  correctAnswer: "c",

  successTitle: "A VERDADE FOI REVELADA",

  successMessage:
    "A Coroa Abissal nunca foi apenas uma joia. O verdadeiro tesouro era a história perdida do reino e daqueles que protegeram o oceano durante séculos.",
};

export { locations, finalRiddle };