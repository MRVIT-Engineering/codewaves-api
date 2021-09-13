import mongoose, { Schema } from 'mongoose';

// import { Tab } from '../../constants/types';

// export interface LectureType {
//   title: string;
//   type: 'text' | 'quizz' | 'example';
//   sublectures?: [];
//   tabs?: Tab[];
//   quizz?: {};
// }

export const LectureSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
  },
  type: {
    type: String,
    unique: false,
  },
  sublectures: {
    type: Array,
  },
  tabs: {
    type: Array,
    default: [],
  },
  quizz: { type: Schema.Types.ObjectId, ref: 'Quizz' },
});

export const Lecture = mongoose.model('Lecture', LectureSchema);
