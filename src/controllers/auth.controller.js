const response = require("../../helpers/response");
const authModel = require("../models/auth.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const url = "http://localhost:4000/api/v1/";
const ARGON_SECRET_KEY = process.env.ARGON_SECRET_KEY;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {
  register: async (req, res) => {
    try {
      if(req.body.confirm_password !== req.body.password) {
        return response.badRequest(res, 'Password and Confirm Password in corret!', [], url);
      }
      const hashPassword = await argon2.hash(req.body.username, {
        secret: Buffer.from(ARGON_SECRET_KEY),
      });
      const request = {
        ...req.body,
        password: hashPassword,
      };
      const result = await authModel.register(request);

      return response.created(res, result, "Success Created User!", url);
    } catch (error) {
      if (error.statusCode === 500) {
        return response.serverError(res, error.message, [], url);
      }
      return response.badRequest(res, error.message, [], url);
    }
  },
  login: async (req, res) => {
    try {
      const result = await authModel.login(req.body);

      const verifyPassword = argon2.verify(result.password, req.body.password, {
        secret: Buffer.from(ARGON_SECRET_KEY),
      });

      if (verifyPassword) {
        const token = jwt.sign(
          { id: result.id, user: result.username },
          JWT_SECRET_KEY
        );

        return response.ok(res, { result, token }, "Success Login", url);
      }
      return response.badRequest(res, "Login Failed!", [], url);
    } catch (error) {
      if (error.statusCode === 500) {
        return response.serverError(res, error.message, [], url);
      }
      return response.badRequest(res, error.message, [], url);
    }
  },
};

module.exports = authController;
