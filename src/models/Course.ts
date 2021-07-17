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
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  publish: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
    unique: false,
  },
  lectures: {
    type: Array,
    default: [],
    unique: false,
  },
  requirements: {
    type: Array,
    default: [],
    unique: false,
  },
});

export const Course = mongoose.model('course', CourseSchema);
