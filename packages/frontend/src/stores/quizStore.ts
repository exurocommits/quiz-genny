import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizState, Phase } from '@quiz-genny/shared';

interface QuizStore extends QuizState {
  // Actions
  setPhase: (phase: Phase) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  config: {
    audiencePreset: 'casual_social',
    audienceAttributes: [],
    tone: 'casual_witty',
    roundCount: 5,
    questionsPerRound: 10,
    difficultyTarget: {
      easy: 4,
      medium: 4,
      hard: 2,
    },
    answerRevealFrequency: 'after_each_round',
    contextNotes: '',
  },
  sections: {
    generated: [],
    selected: [],
    generationCount: 0,
  },
  rounds: [],
  verification: {
    status: 'pending',
    progress: 0,
  },
  images: {
    stylePreference: 'photography',
    questions: [],
  },
  presentation: {
    title: 'Quiz Night',
    theme: {
      colorScheme: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        background: '#FFFFFF',
        text: '#1F2937',
      },
      fontStyle: 'clean',
      logoPosition: 'title_only',
      backgroundStyle: 'solid',
    },
    hostNotesEnabled: false,
    hostNotes: [],
  },
  generationMemory: {
    rejectedSectionThemes: [],
    rejectedQuestionThemes: new Map(),
    acceptedQuestions: [],
  },
  currentPhase: 'setup',
  currentRoundIndex: 0,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPhase: (phase) => set({ currentPhase: phase }),
      resetQuiz: () => set(initialState),
    }),
    {
      name: 'quiz-genny-storage',
    }
  )
);
