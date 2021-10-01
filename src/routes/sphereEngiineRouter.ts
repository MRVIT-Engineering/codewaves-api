import { Router } from 'express';

import { compilersController } from '../controllers/CompilersController';
import { problemsController } from '../controllers/ProblemsController';
import { emitEvent } from '../utils/events';

const router = Router();

router.post('/submission', compilersController.createCodeSubmission);
router.get('/submission/:id', compilersController.getSubmissionInfo);
router.get('/submission/stream/:submissionId/:stream', compilersController.getSubmissionStream);

router.post('/problem', problemsController.addSPProblem);
router.post('/test_case', problemsController.addSPTestCase);

router.post('/webhooks', (req, res) => {
  // console.log('Emiting new event: ', req.body);
  emitEvent('submissionStatusChanged', req.body);
  res.status(200).end();
});

export default router;
