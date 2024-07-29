//Dependecies
const { check, validationResult } = require("express-validator");
const createError = require("http-error");
const path = require("path");
const { unlink } = require("fs");

//Internal modules
const User = require("../../models/People");

//add User validator
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is Required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must be contain Alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true }) //must use country code)
    .withMessage("Bangladeshi Mobile only")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 6 char long and contain 1 lowercase, 1 uppercase, 1 nummber and 1 symbol"
    ),
];

//Add User Validator Handler if any error
const addUserValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    //removed uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

//module exports
module.exports = { addUserValidators, addUserValidatorHandler };
