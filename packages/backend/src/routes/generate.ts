import { Router } from 'express';
import { llmService } from '../services/llm.service';

export const generateRouter = Router();

// POST /api/generate/sections
generateRouter.post('/sections', async (req, res) => {
  try {
    const { config, existingThemes, userFeedback } = req.body;

    if (!config) {
      return res.status(400).json({ error: 'Config is required' });
    }

    const result = await llmService.generateSections({
      config,
      existingThemes,
      userFeedback,
    });

    res.json(result);
  } catch (error) {
    console.error('Section generation error:', error);
    res.status(500).json({
      error: 'Failed to generate sections',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/generate/questions
generateRouter.post('/questions', async (req, res) => {
  try {
    const { section, config, rejectedThemes, difficultyGaps, userFeedback, count } = req.body;

    if (!section || !config || !difficultyGaps) {
      return res.status(400).json({ error: 'Section, config, and difficultyGaps are required' });
    }

    const result = await llmService.generateQuestions({
      section,
      config,
      rejectedThemes,
      difficultyGaps,
      userFeedback,
      count,
    });

    res.json(result);
  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({
      error: 'Failed to generate questions',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/generate/host-notes
generateRouter.post('/host-notes', async (req, res) => {
  try {
    // Placeholder - will be implemented in Phase 5
    res.json({
      notes: [],
      message: 'Host notes generation endpoint - implementation pending',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate host notes' });
  }
});
