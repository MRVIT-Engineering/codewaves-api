import { Request, Response } from 'express';
import axios from 'axios';

import { Controller } from './Controller';
import { Service } from '../services/Service';
import { Problem } from '../models/Problem';

const TOKEN = process.env.COMPILERS_TOKEN;
const URL = process.env.COMPILERS_URL;

export class CompilersController extends Controller {
  async createCodeSubmission(req: Request, res: Response) {
    try {
      const { source, compilerId, input } = req.body;
      const result = await axios.post(`${URL}/submissions?access_token=${TOKEN}`, { source, compilerId, input });
      if (result) this.sendSuccessResponse(res, result.data);
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }

  async getSubmissionInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { data } = await axios.get(`${URL}/submissions/${id}?access_token=${TOKEN}`);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(false);
    }
  }

  async getSubmissionStream(req: Request, res: Response) {
    const { stream, submissionId } = req.params;
    try {
      const { data } = await axios.get(`${URL}/submissions/${submissionId}/${stream}?access_token=${TOKEN}`);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(false);
    }
  }
}

export const compilersController = new CompilersController(new Service(Problem));
