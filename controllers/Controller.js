"use strict";

const statusCodes = require("../constants/statusCodes");

module.exports = class Controller {
  /**
   *  Base controller layer.
   *  @author Rares Modure
   *  @param service
   * */

  constructor(service) {
    this.service = service;
  }

  _sendInternalErrorResponse(res, error) {
    res.status(statusCodes.internalError).send({ error });
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const document = await this.service.get(id);
      res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async getAll(req, res) {
    try {
      const documents = await this.service.getAll();
      return res.status(statusCodes.success).send(documents);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async insert(req, res) {
    try {
      const response = await this.service.insert(req.body);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async updateById(req, res) {
    const { id } = req.params;
    try {
      const document = await this.service.update(id, req.body);
      return res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }

  async deleteById(req, res) {
    const { id } = req.params;
    try {
      const document = await this.service.delete(id);
      return res.status(statusCodes.success).send(document);
    } catch (error) {
      this._sendInternalErrorResponse(res, error);
    }
  }
};
