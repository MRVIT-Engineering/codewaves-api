import { Router } from 'express';

import { courseController } from '../controllers/CourseController';

const router = Router();

router.post('/', courseController.insert);

export default router;
