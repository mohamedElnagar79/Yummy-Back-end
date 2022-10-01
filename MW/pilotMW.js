const { body, param, query } = require("express-validator");

exports.pilotsValidationAdd = [
  body("nationalID")
    .isLength({ min: 14, max: 14 })

    .isNumeric()
    .withMessage("nationalID must be numeric")
    .notEmpty()
    .withMessage("nationalID is required"),
  body("pilotStatus")
    .optional()
    .isIn(["avilable", "not avilable"])
    .withMessage("pilotStatus must be avilable or not avilable"),
  body("pilotName")
    .notEmpty()
    .withMessage("pilotName is required")
    .isString()
    .withMessage("pilotName must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("pilotName must be between 3 and 50 characters long"),
  body("pilotNumber")
    .notEmpty()
    .withMessage("pilotNumber is required")
    .isNumeric()
    .withMessage("pilotNumber must be a number")
    .isLength({ min: 11, max: 11 })
    .withMessage("pilotNumber must be 11 characters long"),
  body("pilotNotes")
    .optional()
    .isString()
    .withMessage("pilotNotes must be a string"),
  body("pilotPassword")
    .notEmpty()
    .withMessage("pilotPassword is required")
    .isLength({ min: 8 })
    .withMessage("pilotPassword must be between 8 and 20 characters long")
    .isString()
    .withMessage("pilotPassword must be a string"),

  // body("pilotLisenceImage")
  //   .notEmpty()
  //   .withMessage("licence image cant be empety"),
  body("orders")
    .optional()
    .isArray(Number)
    .withMessage("order must be an array of numbers"),
];

exports.pilotsValidationUpdate = [
  body("nationalID")
    .isLength({ min: 14, max: 14 })
    .withMessage("nationalID must be 14 characters long")
    .isNumeric()
    .withMessage("nationalID must be numeric")
    .optional(),
  body("pilotStatus")
    .optional()
    .isIn(["avilable", "not avilable"])
    .withMessage("pilotStatus must be avilable or not avilable"),
  body("pilotName")
    .optional()
    .isString()
    .withMessage("pilotName must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("pilotName must be between 3 and 50 characters long"),
  body("pilotNumber")
    .optional()
    .isNumeric()
    .withMessage("pilotNumber must be a number")
    .isLength({ min: 11, max: 11 })
    .withMessage("pilotNumber must be 11 characters long"),
  body("pilotNotes")
    .optional()
    .isString()
    .withMessage("pilotNotes must be a string"),
  body("pilotPassword")
    .optional()
    .isLength({ min: 8 })
    .withMessage("pilotPassword must be between 8 and 20 characters long")
    .isString()
    .withMessage("pilotPassword must be a string"),

  body("pilotLisenceImage").optional(),
  body("orders")
    // .notEmpty().withMessage("order is required")
    .optional()
    .isArray(Number)
    .withMessage("order must be an array of numbers"),
];

exports.pilotsValidationDelete = [
  param("nationalID")
    .isLength({ min: 14, max: 14 })
    .withMessage("nationalID must be 14 characters long")
    .isNumeric()
    .withMessage("nationalID must be numeric")
    .notEmpty()
    .withMessage("nationalID is required"),
];
exports.pilotValidationDeleteOrder = [
  param("nationalID")
    .isLength({ min: 14, max: 14 })
    .withMessage("nationalID must be 14 characters long")
    .isNumeric()
    .withMessage("nationalID must be numeric")
    .notEmpty()
    .withMessage("nationalID is required"),
  body("order")
    .notEmpty()
    .withMessage("order is required")
    .isArray(Number)
    .withMessage("order must be an array of numbers"),
];
