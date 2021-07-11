import mongoose from 'mongoose';

import { Lecture } from '../constants/types';

export interface Course {
  title: string;
  requirements: [];
  difficulty: 1 | 2 | 3;
  lectures: Lecture[];
}

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  requirements: {
    type: Array,
    default: [],
  },
  difficulty: {
    type: Number,
    required: true,
  },
  lectures: {
    type: Array,
    default: [],
  },
});

export const Course = mongoose.model('course', CourseSchema);
