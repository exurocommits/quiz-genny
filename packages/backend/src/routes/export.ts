import { Router } from 'express';

export const exportRouter = Router();

// POST /api/export/pptx
exportRouter.post('/pptx', async (req, res) => {
  try {
    // Placeholder - will be implemented in Phase 5
    res.json({
      message: 'PPTX export endpoint - implementation pending',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to export PPTX' });
  }
});
