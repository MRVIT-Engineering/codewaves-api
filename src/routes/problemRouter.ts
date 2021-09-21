import { Router } from 'express';

import { problemsController } from '../controllers/SphereEngine/ProblemsController';

const router = Router();

router.post('/', problemsController.insert);
router.put('/:id', problemsController.updateById);
router.get('/:id', problemsController.getById);
router.get('/', problemsController.getAll);
router.delete('/:id', problemsController.deleteById);

export default router;
