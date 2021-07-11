import { Controller } from './Controller';
import { courseService } from '../services/CourseService';
// import { errors } from '../constants/errors';

class CourseController extends Controller {
  constructor(service: any) {
    super(service);
  }
}

export const courseController = new CourseController(courseService);
