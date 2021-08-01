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
      sections: [],
    };

    try {
      const newCourse = await this.service.insert(data);
      this.sendSuccessResponse(res, newCourse);
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }

  async addSection(req: Request, res: Response) {
    const { id, data } = req.body;
    try {
      await this.service.insertSection(id, data);
      const doc = await this.service.get(id);

      this.sendSuccessResponse(res, doc);
    } catch (e) {
      this.sendInternalErrorResponse(res, e);
    }
    return null;
  }

  async addLecture(req: Request, res: Response) {
    const { id, data } = req.body;
    const newSection = await this.service.addLecture(id, data);
    if (newSection) this.sendSuccessResponse(res, newSection);
    else this.sendInternalErrorResponse(res, null);
  }
}

export const courseController = new CourseController(courseService);
