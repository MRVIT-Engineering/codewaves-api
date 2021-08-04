import mongoose from 'mongoose';

export type Option = {
  text?: string;
  code?: string;
  language?: string;
  correct: boolean;
};

export const QuizzSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  question: {
    type: String,
  },
  options: {
    type: Array,
  },
});

export const Quizz = mongoose.model('quizz', QuizzSchema);
