import axios from 'axios';
import { Request, Response } from 'express';
import { problemsService } from '../../services/ProblemsService';

import { Controller } from '../Controller';

const TOKEN = process.env.PROBLEMS_TOKEN;
const URL = process.env.PROBLEMS_URL;
const MASTER_JUDGE = 1001; // Default Sphere Engine exact master judge.
const JUDGE_ID = 1; // Default judge for each individual case.

export class ProblemsController extends Controller {
  async add(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { data } = await axios.post(`${URL}/problems?access_token=${TOKEN}`, {
        name,
        masterjudgeId: MASTER_JUDGE,
      });
      this.sendSuccessResponse(res, data);
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }

  async addSPTestCase(req: Request, res: Response) {
    const { input, output, timelimit, problemId } = req.body;
    const { data, status } = await axios.post(`${URL}/problems/${problemId}/testcases?access_token=${TOKEN}`, {
      input,
      output,
      timelimit,
      judgeId: JUDGE_ID,
    });

    if (status === 201) this.sendSuccessResponse(res, data);
    else this.sendInternalErrorResponse(res, new Error('Something went wrong with Sphere Engine'));
  }

  async getSPProblemTestCases(req: Request, res: Response) {
    try {
      const { problemId } = req.params;
      const { data, status } = await axios.get(`${URL}/problems/${problemId}/testcases?access_token=${TOKEN}`);

      if (status === 200) this.sendSuccessResponse(res, data.items);
      else this.sendInternalErrorResponse(res, new Error('Something went wrong with Sphere Engine.'));
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }

  async addProblemTestCase(req: Request, res: Response) {
    const { input, output, timelimit, problemId } = req.body;
    try {
      const data = await this.service.addProblemTestCase({ input, output, timelimit }, problemId);
      this.sendSuccessResponse(res, data);
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }
}

export const problemsController = new ProblemsController(problemsService);
