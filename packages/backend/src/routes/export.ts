import { Router } from 'express';
import { pptxService } from '../services/pptx.service';

export const exportRouter = Router();

// POST /api/export/pptx
exportRouter.post('/pptx', async (req, res) => {
  try {
    const { state } = req.body;

    if (!state) {
      return res.status(400).json({ error: 'Quiz state is required' });
    }

    const pptxBuffer = await pptxService.generatePresentation(state);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="quiz.pptx"');
    res.send(pptxBuffer);
  } catch (error) {
    console.error('PPTX export error:', error);
    res.status(500).json({ error: 'Failed to export PPTX' });
  }
});
