// Core Types from Specification Section 3.2

export type AudiencePreset =
  | 'casual_social'
  | 'competitive_league'
  | 'corporate'
  | 'international'
  | 'family_friendly';

export type QuizTone = 'casual_witty' | 'formal_professional' | 'family_friendly' | 'pub_banter';

export interface DifficultyDistribution {
  easy: number;
  medium: number;
  hard: number;
}

export type AnswerRevealFrequency = 'after_each_round' | 'after_two_rounds' | 'at_end';

export interface Section {
  id: string;
  name: string;
  description: string;
  estimatedDifficulty: 'tends_easy' | 'tends_medium' | 'tends_hard' | 'mixed';
  category: string;
}

export interface DifficultyScores {
  knowledgeAccessibility: number; // 1-5
  cognitiveLoad: number; // 1-5
  culturalLinguistic: number; // 1-5
  temporalRelevance: number; // 1-5
}

export interface Source {
  url: string;
  title: string;
  snippet: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  difficultyScores: DifficultyScores;
  overallDifficulty: number;
  difficultyBand: 'easy' | 'medium' | 'hard';
  verification: {
    status: 'pending' | 'verified' | 'corrected' | 'unverifiable' | 'user_confirmed';
    originalAnswer?: string;
    correctedAnswer?: string;
    sources: Source[];
    difficultyShifted?: boolean;
  };
  duplicateOf?: string; // question ID if flagged as duplicate
  duplicateAcknowledged?: boolean;
}

export interface Round {
  sectionId: string;
  questions: {
    candidates: Question[];
    accepted: Question[];
  };
  difficultyDistribution: DifficultyDistribution;
  isComplete: boolean;
}

export type ImageStyle = 'photography' | 'illustration' | 'vintage' | 'minimalist' | 'any';

export interface Image {
  url: string;
  thumbnailUrl: string;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'upload';
  attribution: string;
  width: number;
  height: number;
}

export interface QuestionImage {
  questionId: string;
  selectedImage: Image | null;
  alternatives: Image[];
  fallbackTier: 1 | 2 | 3 | 4;
  isTextOnly: boolean;
}

export interface ThemeConfig {
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fontStyle: 'clean' | 'elegant' | 'fun' | 'bold';
  logoUrl?: string;
  logoPosition: 'all_slides' | 'title_only';
  backgroundStyle: 'solid' | 'pattern' | 'gradient' | 'image';
  backgroundImage?: string;
}

export interface HostNote {
  questionId: string;
  notes: string;
}

export type Phase = 'setup' | 'sections' | 'questions' | 'verification' | 'images' | 'preview';

export interface QuizConfig {
  audiencePreset: AudiencePreset;
  audienceAttributes: string[];
  tone: QuizTone;
  roundCount: number;
  questionsPerRound: number;
  difficultyTarget: DifficultyDistribution;
  answerRevealFrequency: AnswerRevealFrequency;
  contextNotes: string;
}

export interface QuizState {
  // Phase 1: Setup
  config: QuizConfig;

  // Phase 2: Sections
  sections: {
    generated: Section[];
    selected: string[]; // ordered array of section IDs
    generationCount: number;
  };

  // Phase 3: Questions
  rounds: Round[];

  // Phase 4: Verification
  verification: {
    status: 'pending' | 'in_progress' | 'complete';
    progress: number; // 0-100
  };

  // Phase 5: Images
  images: {
    stylePreference: ImageStyle;
    questions: QuestionImage[];
  };

  // Phase 6: Preview
  presentation: {
    title: string;
    theme: ThemeConfig;
    hostNotesEnabled: boolean;
    hostNotes: HostNote[];
  };

  // Cross-cutting
  generationMemory: {
    rejectedSectionThemes: string[];
    rejectedQuestionThemes: Map<string, string[]>; // roundId -> themes
    acceptedQuestions: Question[]; // for duplicate detection
  };

  // UI State
  currentPhase: Phase;
  currentRoundIndex: number;
}

// API Request/Response Types

export interface GenerateSectionsRequest {
  config: QuizConfig;
  existingThemes?: string[];
  userFeedback?: string;
}

export interface GenerateSectionsResponse {
  sections: Section[];
}

export interface GenerateQuestionsRequest {
  section: Section;
  config: QuizConfig;
  rejectedThemes: string[];
  difficultyGaps: DifficultyDistribution;
  userFeedback?: string;
  count?: number;
}

export interface GenerateQuestionsResponse {
  inspirationTags: string[];
  questions: Question[];
}

export interface VerifyQuestionsRequest {
  questions: Question[];
}

export interface VerificationResult {
  questionId: string;
  status: 'verified' | 'corrected' | 'unverifiable';
  originalAnswer: string;
  correctedAnswer?: string;
  sources: Source[];
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
}

export interface VerifyQuestionsResponse {
  results: VerificationResult[];
}

export interface GenerateHostNotesRequest {
  questions: Question[];
}

export interface GenerateHostNotesResponse {
  notes: HostNote[];
}

export interface SearchImagesRequest {
  questions: Question[];
  style: ImageStyle;
}

export interface SearchImagesResponse {
  results: QuestionImage[];
}

export interface SearchCustomImageRequest {
  query: string;
  style: ImageStyle;
}

export interface SearchCustomImageResponse {
  images: Image[];
}

export interface ExportPptxRequest {
  state: QuizState;
}

export interface DuplicateCheckRequest {
  newQuestions: Question[];
  existingQuestions: Question[];
}

export interface DuplicateMatch {
  newId: string;
  existingId: string;
  similarity: number;
}

export interface DuplicateCheckResponse {
  duplicates: DuplicateMatch[];
}
