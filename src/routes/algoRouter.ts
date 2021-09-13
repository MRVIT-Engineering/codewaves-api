import { Router } from 'express';

import { algoController } from '../controllers/AlgosController';

const router = Router();

router.post('/', algoController.insert);
router.put('/:id', algoController.updateById);
router.get('/:id', algoController.getById);
router.get('/', algoController.getAll);
router.delete('/:id', algoController.deleteById);

export default router;
