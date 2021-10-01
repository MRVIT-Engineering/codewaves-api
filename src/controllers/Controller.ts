import { Request, Response } from 'express';

import { Service } from '../services/Service';
import { STATUS_CODES } from '../constants/statusCodes';

const autoBind = require('auto-bind');

export class Controller {
  /**
   *  Base controller layer.
   *
   *  @param service
   * */

  service: Service & any;

  constructor(service: Service) {
    this.service = service;
    autoBind(this);
  }

  sendInternalErrorResponse(res: Response, error: any) {
    res.status(STATUS_CODES.internalError).send({ error });
  }

  sendSuccessResponse(res: Response, data: any) {
    res.status(STATUS_CODES.success).send(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const document = await this.service.get(id);
      return this.sendSuccessResponse(res, document);
    } catch (error) {
      return this.sendInternalErrorResponse(res, error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const documents = await this.service.getAll();
      return res.status(STATUS_CODES.success).send(documents);
    } catch (error) {
      return this.sendInternalErrorResponse(res, error);
    }
  }

  async insert(req: Request, res: Response) {
    try {
      const document = await this.service.insert(req.body);
      return res.status(STATUS_CODES.success).send(document);
    } catch (error) {
      return this.sendInternalErrorResponse(res, error);
    }
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const document = await this.service.update(id, req.body);
      return res.status(STATUS_CODES.success).send(document);
    } catch (error) {
      return this.sendInternalErrorResponse(res, error);
    }
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const document = await this.service.delete(id);
      return res.status(STATUS_CODES.success).send(document);
    } catch (error) {
      return this.sendInternalErrorResponse(res, error);
    }
  }
}
