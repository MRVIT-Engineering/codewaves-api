import mongoose from 'mongoose';

const ProblemsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sphereEngineId: {
    type: Number,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  testCases: {
    type: Array,
    default: [],
  },
});

export const Problem = mongoose.model('Problem', ProblemsSchema);
