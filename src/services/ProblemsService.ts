import { TestCase } from '../constants/types/ProblemTypes';
import { Problem } from '../models/Problem';
import { Service } from './Service';

class ProblemsService extends Service {
  async addProblemTestCase(testcase: TestCase, problemId: string) {
    this.model.findByIdAndUpdate(problemId, { $push: { testCases: testcase } });
  }
}

export const problemsService = new ProblemsService(Problem);
