import { Router } from 'express';

import { compilersController } from '../controllers/SphereEngine/CompilersController';
import { problemsController } from '../controllers/SphereEngine/ProblemsController';
import { emitEvent } from '../utils/events';

const router = Router();

router.post('/submission', compilersController.createCodeSubmission);
router.get('/submission/:id', compilersController.getSubmissionInfo);
router.get('/submission/stream/:submissionId/:stream', compilersController.getSubmissionStream);

router.post('/problem', problemsController.add);
router.post('/test_case', problemsController.addSPTestCase);

router.post('/webhooks', (req, res) => {
  emitEvent('submissionStatusChanged', req.body);
  res.status(200).end();
});

export default router;
