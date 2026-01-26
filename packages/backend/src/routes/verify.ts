import { Router } from 'express';
import { verificationService } from '../services/verification.service';

export const verifyRouter = Router();

// POST /api/verify/questions
verifyRouter.post('/questions', async (req, res) => {
  try {
    // Placeholder - will be implemented in Phase 4
    res.json({
      results: [],
      message: 'Question verification endpoint - implementation pending',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify questions' });
  }
});

// POST /api/verify/duplicate-check
verifyRouter.post('/duplicate-check', async (req, res) => {
  try {
    const { newQuestions, existingQuestions } = req.body;

    if (!newQuestions || !existingQuestions) {
      return res.status(400).json({ error: 'newQuestions and existingQuestions are required' });
    }

    const result = await verificationService.checkDuplicates({
      newQuestions,
      existingQuestions,
    });

    res.json(result);
  } catch (error) {
    console.error('Duplicate check error:', error);
    res.status(500).json({
      error: 'Failed to check duplicates',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
