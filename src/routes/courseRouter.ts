import { Router } from 'express';

import { courseController } from '../controllers/CourseController';
import { upload } from '../middleware/fileUpload';

const router = Router();

router.post('/', upload.single('courseImage'), courseController.addCourseWithImage);
router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);
router.put('/:id', courseController.updateById);
router.delete('/:id', courseController.deleteById);

router.post('/new_section', courseController.addSection);

export default router;
