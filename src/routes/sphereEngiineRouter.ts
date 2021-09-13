import { Router } from 'express';

import { compilersController } from '../controllers/SphereEngine/CompilersController';
import { emitEvent } from '../utils/events';

const router = Router();

router.post('/submission', compilersController.createCodeSubmission);
router.get('/submission/:id', compilersController.getSubmissionInfo);
router.get('/submission/stream/:submissionId/:stream', compilersController.getSubmissionStream);

router.post('/webhooks', (req, res) => {
  emitEvent('submissionStatusChanged', req.body);
  res.status(200).end();
});

export default router;
