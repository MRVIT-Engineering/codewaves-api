import { Router } from 'express';

import { quizzController } from '../controllers/QuizzController';

const router = Router();

router.post('/', quizzController.insert);
router.put('/:id', quizzController.updateById);
router.get('/:id', quizzController.getById);
router.get('/', quizzController.getAll);
router.delete('/:id', quizzController.deleteById);

export default router;
