const Service = require("./Service");
const User = require("../models/User");

class AuthService extends Service {
  /**
   * Will be use to see if the registration email is unique.
   * If that is not the case we will return false to the controller.
   * @param {*} email
   */
  async getByEmail(email) {
    let document = await this.model.findOne({ email });
    if (document) return document;
    else return false;
  }

  async insert(data) {
    try {
      let document = await this.model.create(data);
      if (document) {
        console.log("Here we should send activation link via mailgun");
        return document;
      } else throw new Error("Something wrong happened");
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService(User);
module.exports = authService;
