export class Service {
  /**
   * Base service layer. Executes basic CRUD operations
   * on mongoDB atlas using mongoose.
   *
   * @param model mongodb database model.
   */

  model: any;

  constructor(model: any) {
    this.model = model;
  }

  async getAll() {
    const documents = await this.model.find({});
    return documents;
  }

  async get(id: string) {
    const document = await this.model.findById(id);
    if (!document) throw Error('Document does not exist.');
    return document;
  }

  async insert(data: any) {
    const document = await this.model.create(data);
    if (document) return document;
    else throw new Error('Something wrong happened');
  }

  async update(id: string, data: any) {
    const document = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (document) return document;
    else throw new Error('Could not update document.');
  }

  async delete(id: string) {
    const document = await this.model.findByIdAndDelete(id);
    if (!document) throw new Error('document not found');
    else return document;
  }
}
