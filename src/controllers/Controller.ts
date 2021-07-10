"use strict";

import { Request, Response } from "express";
const autoBind = require("auto-bind");

const statusCodes = require("../constants/statusCodes");
import { Service } from "../services/Service";

export class Controller {
  /**
   *  Base controller layer.
   *  @author Rares Modure
   *  @param service
   * */

  service: Service & any;

  constructor(service: Service) {
    this.service = service;
    autoBind(this);
  }

  _sendInternalErrorResponse(res: Response, error: any) {
    res.status(statusCodes.internalError).send({ error });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const document = await this.service.get(id);
      res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const documents = await this.service.getAll();
      return res.status(statusCodes.success).send(documents);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async insert(req: Request, res: Response) {
    try {
      const document = await this.service.insert(req.body);
      return res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const document = await this.service.update(id, req.body);
      return res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const document = await this.service.delete(id);
      return res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }
}
