import { Request, Response } from 'express';

import { Controller } from './Controller';
import { courseService } from '../services/CourseService';

class CourseController extends Controller {
  constructor(service: any) {
    super(service);
  }

  async addCourseWithImage(req: Request, res: Response) {
    const {
      body: { title, difficulty, description },
      file,
    } = req;

    const data = {
      title,
      description,
      difficulty: +difficulty,
      imageUrl: `${process.env.CODEWAVES_API_URL}/images/${file?.originalname}`,
    };

    try {
      const newCourse = await this.service.insert(data);
      this.sendSuccessResponse(res, newCourse);
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }
}

export const courseController = new CourseController(courseService);
