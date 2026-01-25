import OpenAI from 'openai';

export class LLMService {
  private client: OpenAI;
  private model: string;

  constructor() {
    const provider = process.env.LLM_PROVIDER || 'openai';

    if (provider === 'openai') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is required');
      }
      this.client = new OpenAI({ apiKey });
      this.model = process.env.OPENAI_MODEL || 'gpt-4';
    } else {
      throw new Error(`Unsupported LLM provider: ${provider}`);
    }
  }

  // Placeholder methods - will be implemented in Phase 2
  async generateSections(_params: unknown): Promise<unknown> {
    // Implementation pending
    return { sections: [] };
  }

  async generateQuestions(_params: unknown): Promise<unknown> {
    // Implementation pending
    return { inspirationTags: [], questions: [] };
  }

  async generateHostNotes(_params: unknown): Promise<unknown> {
    // Implementation pending
    return { notes: [] };
  }

  // Helper method for making OpenAI calls
  protected async chat(messages: OpenAI.Chat.ChatCompletionMessageParam[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  }
}

export const llmService = new LLMService();
