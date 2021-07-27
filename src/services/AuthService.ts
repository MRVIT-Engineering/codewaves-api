import { Service } from './Service';
import { User } from '../models/User';

class AuthService extends Service {
  /**
   * Will be use to see if the registration email is unique.
   * If that is not the case we will return false to the controller.
   * @param {*} email
   */

  async getByEmail(email: string) {
    const document = await this.model.findOne({ email });
    if (document) return document;
    else return false;
  }

  async insert(data: any) {
    const user = await this.model.create(data);
    if (user) {
      await user.hashPassword();
      await user.save();
      return user;
    } else throw new Error('Something wrong happened');
  }
}

const authService = new AuthService(User);
module.exports = authService;
