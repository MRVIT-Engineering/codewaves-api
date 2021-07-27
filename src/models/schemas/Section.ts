import mongoose, { Schema } from 'mongoose';

export interface SectionType {
  id: string;
  title: string;
  sublectures: [];
}

export const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
  },
  lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
});

export const Section = mongoose.model('Section', SectionSchema);
