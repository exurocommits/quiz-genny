import type { Section, Question, DifficultyScores } from '@quiz-genny/shared';

// Mock Sections (30 varied themes)
export const MOCK_SECTIONS: Section[] = [
  {
    id: 'sec-001',
    name: '90s Pop Music',
    description: 'Chart-toppers, one-hit wonders, and iconic albums from the 1990s',
    estimatedDifficulty: 'tends_easy',
    category: 'entertainment',
  },
  {
    id: 'sec-002',
    name: 'World Geography',
    description: 'Countries, capitals, landmarks, and geographical features from around the globe',
    estimatedDifficulty: 'tends_medium',
    category: 'geography',
  },
  {
    id: 'sec-003',
    name: 'Classic Movies',
    description: 'Hollywood golden age, iconic films, and legendary directors',
    estimatedDifficulty: 'tends_medium',
    category: 'film',
  },
  {
    id: 'sec-004',
    name: 'Science & Nature',
    description: 'Biology, chemistry, physics, and the natural world',
    estimatedDifficulty: 'tends_hard',
    category: 'science',
  },
  {
    id: 'sec-005',
    name: 'Sports Trivia',
    description: 'Olympics, world records, famous athletes, and sporting events',
    estimatedDifficulty: 'tends_easy',
    category: 'sports',
  },
  {
    id: 'sec-006',
    name: 'British History',
    description: 'Monarchs, wars, politics, and significant events in British history',
    estimatedDifficulty: 'tends_hard',
    category: 'history',
  },
  {
    id: 'sec-007',
    name: 'Food & Drink',
    description: 'Cuisine, cocktails, cooking techniques, and culinary traditions',
    estimatedDifficulty: 'tends_easy',
    category: 'food',
  },
  {
    id: 'sec-008',
    name: 'Technology & Gadgets',
    description: 'Inventions, tech companies, computing history, and modern devices',
    estimatedDifficulty: 'tends_medium',
    category: 'technology',
  },
  {
    id: 'sec-009',
    name: 'Literature Classics',
    description: 'Famous authors, classic novels, poetry, and literary movements',
    estimatedDifficulty: 'tends_hard',
    category: 'arts',
  },
  {
    id: 'sec-010',
    name: 'TV Shows of the 2000s',
    description: 'Reality TV, sitcoms, dramas, and memorable TV moments from 2000-2010',
    estimatedDifficulty: 'tends_easy',
    category: 'entertainment',
  },
  {
    id: 'sec-011',
    name: 'Ancient Civilizations',
    description: 'Egypt, Rome, Greece, and other ancient cultures',
    estimatedDifficulty: 'tends_hard',
    category: 'history',
  },
  {
    id: 'sec-012',
    name: 'Video Games',
    description: 'Classic arcade games, modern franchises, and gaming culture',
    estimatedDifficulty: 'tends_medium',
    category: 'entertainment',
  },
  {
    id: 'sec-013',
    name: 'Famous Landmarks',
    description: 'Iconic buildings, monuments, and architectural wonders worldwide',
    estimatedDifficulty: 'tends_easy',
    category: 'geography',
  },
  {
    id: 'sec-014',
    name: 'Rock Music Legends',
    description: 'Classic rock bands, guitar heroes, and unforgettable albums',
    estimatedDifficulty: 'tends_medium',
    category: 'music',
  },
  {
    id: 'sec-015',
    name: 'Space & Astronomy',
    description: 'Planets, stars, space missions, and cosmic phenomena',
    estimatedDifficulty: 'tends_hard',
    category: 'science',
  },
  {
    id: 'sec-016',
    name: 'Fashion & Style',
    description: 'Designers, trends, fashion houses, and style icons',
    estimatedDifficulty: 'tends_medium',
    category: 'lifestyle',
  },
  {
    id: 'sec-017',
    name: 'Cartoon Characters',
    description: 'Animated shows, Disney classics, and memorable cartoon moments',
    estimatedDifficulty: 'tends_easy',
    category: 'entertainment',
  },
  {
    id: 'sec-018',
    name: 'World Politics',
    description: 'Leaders, elections, political movements, and international relations',
    estimatedDifficulty: 'tends_hard',
    category: 'general',
  },
  {
    id: 'sec-019',
    name: 'Animals & Wildlife',
    description: 'Species, habitats, behavior, and conservation',
    estimatedDifficulty: 'tends_easy',
    category: 'science',
  },
  {
    id: 'sec-020',
    name: 'Shakespeare',
    description: "Plays, characters, quotes, and the Bard's legacy",
    estimatedDifficulty: 'tends_hard',
    category: 'arts',
  },
  {
    id: 'sec-021',
    name: 'The 1980s',
    description: 'Music, movies, fashion, and cultural moments from the 80s',
    estimatedDifficulty: 'mixed',
    category: 'potpourri',
  },
  {
    id: 'sec-022',
    name: 'Inventions & Inventors',
    description: 'Game-changing inventions and the people who created them',
    estimatedDifficulty: 'tends_medium',
    category: 'technology',
  },
  {
    id: 'sec-023',
    name: 'Marvel Universe',
    description: 'Superheroes, villains, MCU movies, and comic book lore',
    estimatedDifficulty: 'tends_easy',
    category: 'entertainment',
  },
  {
    id: 'sec-024',
    name: 'Classical Music',
    description: 'Composers, symphonies, operas, and musical masterpieces',
    estimatedDifficulty: 'tends_hard',
    category: 'music',
  },
  {
    id: 'sec-025',
    name: 'Mythology',
    description: 'Greek, Roman, Norse myths, gods, and legendary tales',
    estimatedDifficulty: 'tends_medium',
    category: 'general',
  },
  {
    id: 'sec-026',
    name: 'The Human Body',
    description: 'Anatomy, organs, health, and how the body works',
    estimatedDifficulty: 'tends_medium',
    category: 'science',
  },
  {
    id: 'sec-027',
    name: 'Famous Paintings',
    description: 'Artists, art movements, masterpieces, and galleries',
    estimatedDifficulty: 'tends_hard',
    category: 'arts',
  },
  {
    id: 'sec-028',
    name: 'Travel & Tourism',
    description: 'Destinations, cultures, travel facts, and bucket list locations',
    estimatedDifficulty: 'tends_easy',
    category: 'geography',
  },
  {
    id: 'sec-029',
    name: 'Math & Logic',
    description: 'Numbers, puzzles, mathematical concepts, and brain teasers',
    estimatedDifficulty: 'tends_hard',
    category: 'general',
  },
  {
    id: 'sec-030',
    name: 'True Crime',
    description: 'Famous cases, criminals, detectives, and mysteries',
    estimatedDifficulty: 'mixed',
    category: 'general',
  },
];

// Helper to calculate difficulty band
function calculateDifficultyBand(scores: DifficultyScores): 'easy' | 'medium' | 'hard' {
  const overall =
    (scores.knowledgeAccessibility +
      scores.cognitiveLoad +
      scores.culturalLinguistic +
      scores.temporalRelevance) /
    4;

  if (overall <= 2.0) return 'easy';
  if (overall <= 3.2) return 'medium';
  return 'hard';
}

// Mock Questions Generator
export function generateMockQuestions(sectionId: string, count: number = 15): Question[] {
  const questionTemplates = [
    // Easy questions
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      scores: {
        knowledgeAccessibility: 1,
        cognitiveLoad: 1,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answer: 'Mars',
      scores: {
        knowledgeAccessibility: 1,
        cognitiveLoad: 1,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Who painted the Mona Lisa?',
      answer: 'Leonardo da Vinci',
      scores: {
        knowledgeAccessibility: 2,
        cognitiveLoad: 1,
        culturalLinguistic: 2,
        temporalRelevance: 1,
      },
    },
    {
      question: 'What is the largest ocean on Earth?',
      answer: 'Pacific Ocean',
      scores: {
        knowledgeAccessibility: 1,
        cognitiveLoad: 1,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Which animal is known as the King of the Jungle?',
      answer: 'Lion',
      scores: {
        knowledgeAccessibility: 1,
        cognitiveLoad: 1,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    // Medium questions
    {
      question: 'In which year did World War II end?',
      answer: '1945',
      scores: {
        knowledgeAccessibility: 2,
        cognitiveLoad: 2,
        culturalLinguistic: 2,
        temporalRelevance: 3,
      },
    },
    {
      question: 'What is the chemical symbol for gold?',
      answer: 'Au',
      scores: {
        knowledgeAccessibility: 3,
        cognitiveLoad: 1,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      answer: 'William Shakespeare',
      scores: {
        knowledgeAccessibility: 2,
        cognitiveLoad: 1,
        culturalLinguistic: 3,
        temporalRelevance: 2,
      },
    },
    {
      question: 'What is the speed of light in vacuum?',
      answer: '299,792,458 meters per second (or ~300,000 km/s)',
      scores: {
        knowledgeAccessibility: 3,
        cognitiveLoad: 2,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Which British band released the album "The Dark Side of the Moon"?',
      answer: 'Pink Floyd',
      scores: {
        knowledgeAccessibility: 2,
        cognitiveLoad: 1,
        culturalLinguistic: 3,
        temporalRelevance: 3,
      },
    },
    // Hard questions
    {
      question: 'What is the smallest prime number greater than 100?',
      answer: '101',
      scores: {
        knowledgeAccessibility: 4,
        cognitiveLoad: 4,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Who was the Roman Emperor when Pompeii was destroyed?',
      answer: 'Titus',
      scores: {
        knowledgeAccessibility: 4,
        cognitiveLoad: 2,
        culturalLinguistic: 3,
        temporalRelevance: 4,
      },
    },
    {
      question: 'In which novel does the character Holden Caulfield appear?',
      answer: 'The Catcher in the Rye',
      scores: {
        knowledgeAccessibility: 4,
        cognitiveLoad: 2,
        culturalLinguistic: 4,
        temporalRelevance: 3,
      },
    },
    {
      question: 'What is the quantum of electromagnetic radiation called?',
      answer: 'Photon',
      scores: {
        knowledgeAccessibility: 4,
        cognitiveLoad: 3,
        culturalLinguistic: 1,
        temporalRelevance: 1,
      },
    },
    {
      question: 'Which composer wrote "The Four Seasons"?',
      answer: 'Antonio Vivaldi',
      scores: {
        knowledgeAccessibility: 3,
        cognitiveLoad: 1,
        culturalLinguistic: 4,
        temporalRelevance: 4,
      },
    },
  ];

  return Array.from({ length: count }, (_, index) => {
    const template = questionTemplates[index % questionTemplates.length];
    const overall =
      (template.scores.knowledgeAccessibility +
        template.scores.cognitiveLoad +
        template.scores.culturalLinguistic +
        template.scores.temporalRelevance) /
      4;

    return {
      id: `${sectionId}-q-${index + 1}`,
      question: template.question,
      answer: template.answer,
      difficultyScores: template.scores,
      overallDifficulty: overall,
      difficultyBand: calculateDifficultyBand(template.scores),
      verification: {
        status: 'pending' as const,
        sources: [],
      },
    };
  });
}

// Audience attribute tags
export const AUDIENCE_TAGS = {
  interests: [
    'Sports fans',
    'Movie buffs',
    'Music lovers',
    'Gamers',
    'Bookworms',
    'Foodies',
    'Tech enthusiasts',
    'History nerds',
    'Science geeks',
    'Pop culture addicts',
    'Travel lovers',
    'Nature/outdoors',
    'Fashion/style',
    'Cars/motorsport',
    'Politics followers',
    'Business/finance',
    'Art/design',
    'Theatre/musicals',
    'Reality TV watchers',
    'Podcast listeners',
    'Anime/manga fans',
    'Comic book fans',
    'True crime fans',
    'DIY/crafts',
  ],
  demographics: [
    '80s kids',
    '90s kids',
    '2000s kids',
    'Gen Z',
    'Millennials',
    'Gen X',
    'Boomers',
    'Mixed ages',
    'Mostly 20s-30s',
    'Mostly 40s-50s',
    'Mostly male',
    'Mostly female',
    'Mixed gender',
  ],
  context: [
    'Work colleagues',
    'Strangers/new group',
    'Close friends',
    'Family members',
    'Students',
    'Professionals',
    'Experts in their field',
    'Casual/hobbyist knowledge',
  ],
  geography: [
    'UK-based',
    'US-based',
    'Europe-based',
    'Asia-based',
    'Australia/NZ-based',
    'Globally mixed',
  ],
};
