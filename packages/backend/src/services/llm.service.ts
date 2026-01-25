import Anthropic from '@anthropic-ai/sdk';

export class LLMService {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }
    this.client = new Anthropic({ apiKey });
  }

  // Placeholder methods - will be implemented in Phase 2
  async generateSections(params: unknown): Promise<unknown> {
    // Implementation pending
    return { sections: [] };
  }

  async generateQuestions(params: unknown): Promise<unknown> {
    // Implementation pending
    return { inspirationTags: [], questions: [] };
  }

  async generateHostNotes(params: unknown): Promise<unknown> {
    // Implementation pending
    return { notes: [] };
  }
}

export const llmService = new LLMService();
