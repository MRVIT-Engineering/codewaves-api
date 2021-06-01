"use strict";

const Controller = require("./Controller");
const userService = require("../services/AuthService");
const statusCodes = require("../constants/statusCodes");
const autoBind = require("auto-bind");

class AuthController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }

  async _log() {
    let user = await this.service.getByEmail("email");
    console.log(user);
  }

  async register(req, res) {
    const email = req.body.email;
    const emailAlreadyExists = await this.service.getByEmail(email);

    if (emailAlreadyExists)
      return res
        .stauts(statusCodes.fail)
        .send({ emailInUse: true, message: "This email is already in use." });

    const newUser = await this.service.insert(req.body);
    console.log("The newly created user is ", newUser);
  }
}

const authController = new AuthController(userService);
authController._log();

module.exports = authController;
