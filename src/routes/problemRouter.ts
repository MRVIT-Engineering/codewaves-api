import { Router } from 'express';

import { problemsController } from '../controllers/SphereEngine/ProblemsController';

const router = Router();

router.post('/', problemsController.insert);
router.get('/', problemsController.getAll);
router.put('/test_case', problemsController.addProblemTestCase);

router.get('/:id', problemsController.getById);
router.put('/:id', problemsController.updateById);
router.delete('/:id', problemsController.deleteById);

export default router;
