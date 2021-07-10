"use strict";

export class Service {
  /**
   * Base service layer.
   * @author Rares Modure
   * @param model mongodb database model.
   */

  model: any;

  constructor(model: any) {
    this.model = model;
  }

  async getAll() {
    try {
      let documents = await this.model.find({});
      return documents;
    } catch (errors) {
      throw errors;
    }
  }

  async get(id: string) {
    try {
      let document = await this.model.findById(id);
      if (!document) throw Error("Document does not exist.");
      return document;
    } catch (errors) {
      throw errors;
    }
  }

  async insert(data: any) {
    try {
      let document = await this.model.create(data);
      if (document) return document;
      else throw new Error("Something wrong happened");
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let document = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (document) return document;
      else throw new Error("Could not update document.");
    } catch (errors) {
      throw errors;
    }
  }

  async delete(id: string) {
    try {
      let document = await this.model.findByIdAndDelete(id);
      if (!document) throw new Error("document not found");
      else return document;
    } catch (errors) {
      throw errors;
    }
  }
}
