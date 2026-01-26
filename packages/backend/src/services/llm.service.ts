import dotenv from 'dotenv';
// Load environment variables FIRST before anything else
dotenv.config();

import OpenAI from 'openai';
import type {
  GenerateSectionsRequest,
  GenerateSectionsResponse,
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
  Section,
  Question,
  DifficultyScores,
} from '@quiz-genny/shared';

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

  async generateSections(params: GenerateSectionsRequest): Promise<GenerateSectionsResponse> {
    const { config, existingThemes = [], userFeedback = '' } = params;

    const avoidThemes =
      existingThemes.length > 0 ? `\nAvoid these themes: ${existingThemes.join(', ')}` : '';

    const feedbackNote = userFeedback ? `\nAdditional guidance: ${userFeedback}` : '';

    const prompt = `You are a creative quiz master designing quiz round themes.

Audience: ${config.audiencePreset} (${config.audienceAttributes.join(', ')})
Tone: ${config.tone}
Number of rounds needed: ${config.roundCount}${avoidThemes}${feedbackNote}

Generate ${Math.min(config.roundCount + 10, 15)} creative, varied quiz section ideas that would work well for this audience.

For each section, estimate difficulty:
- "tends_easy": Most people can answer these questions
- "tends_medium": Requires some knowledge or thinking
- "tends_hard": Challenging, requires specific knowledge
- "mixed": Questions vary widely in difficulty

Categories: entertainment, sports, history, science, geography, arts, food, technology, general, music, film, potpourri, lifestyle

Return ONLY valid JSON (no markdown, no explanation):
{
  "sections": [
    {
      "name": "Section Name",
      "description": "Brief description of what this round covers",
      "estimatedDifficulty": "tends_easy",
      "category": "entertainment"
    }
  ]
}`;

    const response = await this.chat([
      {
        role: 'system',
        content: 'You are a helpful quiz master. Always respond with valid JSON only.',
      },
      { role: 'user', content: prompt },
    ]);

    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse sections from LLM response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Add IDs to sections
    const sections: Section[] = parsed.sections.map(
      (
        s: {
          name: string;
          description: string;
          estimatedDifficulty: 'tends_easy' | 'tends_medium' | 'tends_hard' | 'mixed';
          category: string;
        },
        index: number
      ) => ({
        id: `sec-${Date.now()}-${index}`,
        ...s,
      })
    );

    return { sections };
  }

  async generateQuestions(params: GenerateQuestionsRequest): Promise<GenerateQuestionsResponse> {
    const {
      section,
      config,
      rejectedThemes = [],
      difficultyGaps,
      userFeedback = '',
      count = 15,
    } = params;

    const avoidThemes =
      rejectedThemes.length > 0 ? `\nAvoid questions about: ${rejectedThemes.join(', ')}` : '';

    const feedbackNote = userFeedback ? `\nAdditional guidance: ${userFeedback}` : '';

    const prompt = `Generate ${count} quiz questions for the following theme:

Section: ${section.name}
Description: ${section.description}

Audience: ${config.audiencePreset} (${config.audienceAttributes.join(', ')})
Tone: ${config.tone}
Target difficulty: ${difficultyGaps.easy} easy, ${difficultyGaps.medium} medium, ${difficultyGaps.hard} hard${avoidThemes}${feedbackNote}

For EACH question, score these 4 dimensions on a scale of 1-5:
1. knowledgeAccessibility (1=very common knowledge, 5=very obscure)
2. cognitiveLoad (1=simple recall, 5=complex reasoning)
3. culturalLinguistic (1=universal, 5=culture-specific)
4. temporalRelevance (1=timeless, 5=specific era)

Return ONLY valid JSON (no markdown, no explanation):
{
  "inspirationTags": ["keyword1", "keyword2", "keyword3"],
  "questions": [
    {
      "question": "What is...?",
      "answer": "The answer",
      "difficultyScores": {
        "knowledgeAccessibility": 2,
        "cognitiveLoad": 1,
        "culturalLinguistic": 1,
        "temporalRelevance": 1
      }
    }
  ]
}`;

    const response = await this.chat([
      {
        role: 'system',
        content:
          'You are a helpful quiz master. Always respond with valid JSON only. Create interesting, fair quiz questions.',
      },
      { role: 'user', content: prompt },
    ]);

    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse questions from LLM response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Process questions: add IDs, calculate difficulty bands
    const questions: Question[] = parsed.questions.map(
      (
        q: { question: string; answer: string; difficultyScores: DifficultyScores },
        index: number
      ) => {
        const overallDifficulty =
          (q.difficultyScores.knowledgeAccessibility +
            q.difficultyScores.cognitiveLoad +
            q.difficultyScores.culturalLinguistic +
            q.difficultyScores.temporalRelevance) /
          4;

        let difficultyBand: 'easy' | 'medium' | 'hard';
        if (overallDifficulty <= 2.0) {
          difficultyBand = 'easy';
        } else if (overallDifficulty <= 3.2) {
          difficultyBand = 'medium';
        } else {
          difficultyBand = 'hard';
        }

        return {
          id: `${section.id}-q-${Date.now()}-${index}`,
          question: q.question,
          answer: q.answer,
          difficultyScores: q.difficultyScores,
          overallDifficulty,
          difficultyBand,
          verification: {
            status: 'pending' as const,
            sources: [],
          },
        };
      }
    );

    return {
      inspirationTags: parsed.inspirationTags || [],
      questions,
    };
  }

  async generateHostNotes(_params: unknown): Promise<unknown> {
    // Implementation pending - Phase 5
    return { notes: [] };
  }

  // Helper method for making OpenAI calls
  protected async chat(messages: OpenAI.Chat.ChatCompletionMessageParam[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
      // gpt-5-nano-2025-08-07 only supports default temperature (1)
    });

    return response.choices[0]?.message?.content || '';
  }
}

export const llmService = new LLMService();
