import { Router } from 'express';

import { playgroundController } from '../controllers/PlaygroundController';

const router = Router();

router.get('/by_user/', playgroundController.getAllByUser);

router.post('/', playgroundController.insert);
router.put('/:id', playgroundController.updateById);
router.get('/:id', playgroundController.getById);
router.get('/', playgroundController.getAll);
router.delete('/:id', playgroundController.deleteById);

export default router;
