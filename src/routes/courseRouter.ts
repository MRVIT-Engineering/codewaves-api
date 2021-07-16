import { Router } from 'express';

import { courseController } from '../controllers/CourseController';
import { upload } from '../middleware/fileUpload';

const router = Router();

router.post('/', upload.single('courseImage'), courseController.addCourseWithImage);
router.get('/', courseController.getAll);

export default router;
