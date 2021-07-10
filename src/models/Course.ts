const mongoose = require("mongoose");

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

export const Course = mongoose.model("course", CourseSchema);
