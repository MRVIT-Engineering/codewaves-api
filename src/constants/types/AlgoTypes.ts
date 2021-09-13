import { AlgoComplexities, AlgorithmTypes } from '../enums';

type LanguageAlgorithm = {
  language: string;
  code: string;
};

export interface Algo {
  title: string;
  complexity: AlgoComplexities;
  type: AlgorithmTypes;
  algorithm: LanguageAlgorithm[];
}
