import { Router } from 'express';

import { courseController } from '../controllers/CourseController';

const router = Router();

router.post('/', courseController.addSection);
router.put('/add_lecture', courseController.addLecture);

export default router;
