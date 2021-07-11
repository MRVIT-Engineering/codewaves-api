import { Course } from '../models/Course';
import { Service } from './Service';

class CourseService extends Service {}

export const courseService = new CourseService(Course);
