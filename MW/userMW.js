const { body, param, query } = require("express-validator");

exports.userValaidationAdd = [
  body("userFullName")
    .notEmpty()
    .withMessage("userName is required")
    .isString()
    .withMessage("userName must be a string")
    .isLength({ max: 50 })
    .withMessage("userName must be less than 50 characters long"),
  body("userEmail")
    .notEmpty()
    .withMessage("userEmail is required")
    .isEmail()
    .withMessage("userEmail must be a valid email")
    .isLength({ max: 50 })
    .withMessage("userEmail must be less than 50 characters long"),
  body("userPhone")
    .notEmpty()
    .withMessage("userPhone is required")
    .isNumeric()
    .withMessage("userPhone must be a number")
    .isLength({ min: 11, max: 11 })
    .withMessage("userPhone must be 11 characters long"),
  body("userPassword")
    .notEmpty()
    .withMessage("userPassword is required")
    .isString()
    .withMessage("userPassword must be a string"),
  body("userOrder")
    .optional()
    .isArray(Number)
    .withMessage("userOrder must be an array of numbers"),
  //   body("userAddress")
  //     .notEmpty()
  //     .withMessage("userAddress is required")
  //     .isObject()
  //     .withMessage("userAddress must be an object"),
  body("userAddress.zone")
    .notEmpty()
    .withMessage("userAddress.zone is required")
    .isString()
    .withMessage("userAddress.zone must be a string"),
  body("userAddress.street")
    .notEmpty()
    .withMessage("userAddress.street is required")
    .isString()
    .withMessage("userAddress.street must be a string"),
  body("userAddress.building")
    .notEmpty()
    .withMessage("userAddress.building is required")
    .isString()
    .withMessage("userAddress.building must be a string"),
  body("userAddress.floor")
    .optional()
    .isNumeric()
    .withMessage("userAddress.floor must be a number"),
  body("userAddress.apartment")
    .optional()
    .isString()
    .withMessage("userAddress.apartment must be a string"),
  body("userAddress.notes")
    .optional()
    .isString()
    .withMessage("userAddress.notes must be a string"),
  // body("userAddress.lat").notEmpty().withMessage("userAddress.lat is required")
  //     .isNumeric().withMessage("userAddress.lat must be a number"),
  // body("userAddress.lng").notEmpty().withMessage("userAddress.lng is required")
  //     .isNumeric().withMessage("userAddress.lng must be a number")
];
exports.userValaidationUpdate = [
  body("userFullName")
    .optional()
    .isString()
    .withMessage("userName must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("userName must be between 3 and 50 characters long"),
  body("userEmail")
    .optional()
    .isEmail()
    .withMessage("userEmail must be a valid email")
    .isLength({ min: 3, max: 50 })
    .withMessage("userEmail must be between 3 and 50 characters long"),
  body("userPhone")
    .optional()
    .isNumeric()
    .withMessage("userPhone must be a number")
    .isLength({ min: 11, max: 11 })
    .withMessage("userPhone must be 11 characters long"),
  body("userPassword")
    .optional()
    .isLength({ min: 8, max: 20 })
    .withMessage("userPassword must be between 8 and 20 characters long")
    .isString()
    .withMessage("userPassword must be a string"),
];
exports.userValaidationDelete = [
  param("id")
    .notEmpty()
    .withMessage("userId is required")
    .isNumeric()
    .withMessage("userId must be a number")
    .isLength({ min: 1, max: 10 })
    .withMessage("userId must be between 1 and 10 characters long"),
];
exports.userValidationDeleteOrder = [
  param("id")
    .notEmpty()
    .withMessage("orderId is required")
    .isLength({ min: 1, max: 10 })
    .withMessage("orderId must be between 1 and 10 characters long"),
  body("userOrder")
    .notEmpty()
    .withMessage("userOrder is required")
    .isNumeric()
    .withMessage("userOrder must number"),
];
