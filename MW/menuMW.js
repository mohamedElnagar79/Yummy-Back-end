const { body, param, query } = require("express-validator");

exports.menuValidationAdd = [
  body("kitchen")
    .notEmpty()
    .withMessage("kitchen is required")
    .isNumeric()
    .withMessage("kitchen must be number"),
  body("menuItems")
    .notEmpty()
    .withMessage("menuItems is required")
    .isNumeric()
    .withMessage("menuItems must be a number"),
];

exports.menuValidationUpdate = [
  body("kitchen")
    .optional()
    .isNumeric()
    .withMessage("kitchen id must be number"),
  body("menuItems")
    .optional()
    .isNumeric()
    .withMessage("menuItems must be a number"),
];
exports.menuValidationdelete = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("id must be between 3 and 50 characters long"),
];

exports.menuValidationDeleteMenuItem = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string"),
];
