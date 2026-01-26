import { compareTwoStrings } from 'string-similarity';
import type {
  DuplicateCheckRequest,
  DuplicateCheckResponse,
  DuplicateMatch,
  Question,
} from '@quiz-genny/shared';

export class VerificationService {
  constructor() {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      console.warn('TAVILY_API_KEY not set - verification service will not work');
    }
  }

  // Placeholder methods - will be implemented in Phase 4
  async verifyQuestions(questions: unknown[]): Promise<unknown[]> {
    // Implementation pending
    return [];
  }

  async checkDuplicates(params: DuplicateCheckRequest): Promise<DuplicateCheckResponse> {
    const { newQuestions, existingQuestions } = params;
    const duplicates: DuplicateMatch[] = [];

    const SIMILARITY_THRESHOLD = 0.8; // 80% similarity = duplicate

    for (const newQ of newQuestions) {
      for (const existingQ of existingQuestions) {
        const similarity = compareTwoStrings(
          newQ.question.toLowerCase(),
          existingQ.question.toLowerCase()
        );

        if (similarity >= SIMILARITY_THRESHOLD) {
          duplicates.push({
            newId: newQ.id,
            existingId: existingQ.id,
            similarity,
          });
        }
      }
    }

    return { duplicates };
  }
}

export const verificationService = new VerificationService();
