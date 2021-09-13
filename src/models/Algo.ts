import mongoose from 'mongoose';

const AlgoSchema = new mongoose.Schema({
  title: String,
  complexity: String,
  type: String,
  algorithm: Array,
});

export const Algo = mongoose.model('Algo', AlgoSchema);
