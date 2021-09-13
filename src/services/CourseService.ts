import { Course } from '../models/Course';
import { Lecture } from '../models/schemas/Lecture';
import { Section, SectionType } from '../models/schemas/Section';
import { Service } from './Service';

import { LectureType } from '../constants/types';

class CourseService extends Service {
  async get(id: string) {
    const doc = await Course.findById(id)
      .populate({ path: 'sections', populate: { path: 'lectures' } })
      .exec();
    return doc;
  }

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

  async addLecture(id: string, data: LectureType) {
    const document = await Lecture.create(data);
    if (!document) {
      throw Error('Lecture was not created.');
    } else {
      const section: any = await Section.findById(id);
      section.lectures.push(document._id);
      const newSection = await section.save();
      return newSection;
    }
  }
}

export const courseService = new CourseService(Course);
