import { Course } from '../models/Course';
import { Section, SectionType } from '../models/schemas/Section';
import { Service } from './Service';

class CourseService extends Service {
  async insertSection(id: string, data: SectionType) {
    const document = await Section.create(data);
    if (!document) {
      throw Error('Document was not created.');
    } else {
      const course: any = await this.get(id);
      course.sections.push(document._id);
      await course.save();
      return course;
    }
  }

  async get(id: string) {
    const doc = await Course.findById(id).populate('sections').exec();
    return doc;
  }
}

export const courseService = new CourseService(Course);
