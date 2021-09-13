import { Response } from 'express';

import { Controller } from './Controller';
import { playgroundService } from '../services/PlaygroundService';

class PlaygroundController extends Controller {
  constructor(service: any) {
    super(service);
  }

  async insert(req: Request & any, res: Response) {
    try {
      // is this working
      const document = await this.service.insert({ ...req.body, userId: req.user._id });
      return this.sendSuccessResponse(res, document);
    } catch (error) {
      return this.sendInternalErrorResponse(res, error);
    }
  }

  async getAllByUser(req: any, res: Response) {
    try {
      const docs = await this.service.getAllByUser(req.user._id);
      this.sendSuccessResponse(res, docs);
    } catch (error) {
      this.sendInternalErrorResponse(res, error);
    }
  }
}

export const playgroundController = new PlaygroundController(playgroundService);
