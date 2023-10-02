const Users = require("../models/userModels");
const { OAuth2Client } = require("google-auth-library");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../config/generateToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/sendMail");

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `http://localhost:3000`;

const authCtrl = {
  // ... other methods ...

  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      const { name, email, password } = req.body;

      if (password?.length < 6) {
        return next(
          CustomErrorHandler.badRequest("Password must be at least 6 characters.")
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.json({
        message: "Created a user.",
      });
    } catch (error) {
      return next(error);
    }
  },

  // ... other methods ...
};

module.exports = authCtrl;
