import { TestCase } from '../constants/types/ProblemTypes';
import { Problem } from '../models/Problem';
import { Service } from './Service';

class ProblemsService extends Service {
  async addProblemTestCase(testcase: TestCase, problemId: string) {
    await this.model.findOneAndUpdate({ _id: problemId }, { $push: { testCases: testcase } });
  }
}

export const problemsService = new ProblemsService(Problem);
