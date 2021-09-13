import mongoose, { Schema } from 'mongoose';

const playgroundSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    tabs: {
      type: Array,
      required: true,
    },
    compilers: {
      type: Array,
      required: true,
    },
    activeCompilerIndex: {
      type: Number,
      required: true,
      default: 0,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Playground = mongoose.model('Playground', playgroundSchema);
