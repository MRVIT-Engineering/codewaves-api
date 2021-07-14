import { Router } from 'express';
import multer from 'multer';

import { courseController } from '../controllers/CourseController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/images');
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname.toLowerCase().split(' ').join('-'));
  },
});

const upload = multer({ storage });
router.post('/', upload.single('courseImage'), courseController.addCourseWithImage);

export default router;
