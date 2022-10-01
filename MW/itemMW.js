const { body, param, query } = require("express-validator");

exports.itemValidationAdd = [
  body("itemName")
    .notEmpty()
    .withMessage("itemName is required")
    .isString()
    .withMessage("itemName must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemName must be between 1 and 25 characters long"),
  body("itemDescription")
    .notEmpty()
    .withMessage("itemDescription is required")
    .isString()
    .withMessage("itemDescription must be a string"),
  body("itemPrice")
    .notEmpty()
    .withMessage("itemPrice is required")
    .isNumeric()
    .withMessage("itemPrice must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("itemPrice must be between 1 and 5 digits long"),
  body("itemStatus")
    .optional()
    .isString()
    .withMessage("itemStatus must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemStatus must be between 1 and 25 characters long"),
  body("itemCatogery")
    .notEmpty()
    .withMessage("itemCatogery is required")
    .isString()
    .withMessage("itemCatogery must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemCatogery must be between 1 and 25 characters long"),
];

exports.itemValidationUpdate = [
  body("itemName")
    .optional()
    .isString()
    .withMessage("itemName must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemName must be between 1 and 25 characters long"),
  body("itemDescription")
    .optional()
    .isString()
    .withMessage("itemDescription must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemDescription must be between 1 and 25 characters long"),
  body("itemPrice")
    .optional()
    .isNumeric()
    .withMessage("itemPrice must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("itemPrice must be between 1 and 5 digits long"),
  body("itemStatus")
    .optional()
    .isString()
    .withMessage("itemStatus must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemStatus must be between 1 and 25 characters long"),
  body("itemCatogery")
    .optional()
    .isString()
    .withMessage("itemCatogery must be a string")
    .isLength({ min: 1, max: 25 })
    .withMessage("itemCatogery must be between 1 and 4 characters long"),
];
exports.itemValidationDelete = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number")
    .isLength({ min: 1, max: 4 }),
];
