const { body, param, query } = require("express-validator");

exports.kitchenValidationAdd = [
  body("kitchenName")
    .notEmpty()
    .withMessage("kitchenName is required")
    .isString()
    .withMessage("kitchenName must be a string")
    .isLength({ max: 50 })
    .withMessage("kitchenName must 50 characters long"),
  body("kitchenCategeory")
    // .notEmpty()
    // .withMessage("kitchenCategeory is required")
    // .optional()
    .isString()
    .withMessage("kitchenCategeory must be a string"),
  // .isLength({ min: 3, max: 50 })
  // .withMessage("kitchenCategeory must be between 3 and 50 characters long")
  body("kitchenPhone")
    .notEmpty()
    .withMessage("kitchenPhone is required")
    .isNumeric()
    .withMessage("kitchenPhone must be a number")
    .isLength({ min: 11, max: 11 })
    .withMessage("kitchenPhone must be 11 digits long"),
  body("kitchenEmail")
    .notEmpty()
    .withMessage("kitchenEmail is required")
    .isEmail()
    .withMessage("kitchenEmail must be a valid email")
    .isLength({ max: 50 })
    .withMessage("kitchenEmail must 50 characters long"),
  body("kitchenPassword")
    .notEmpty()
    .withMessage("kitchenPassword is required")
    .isString()
    .withMessage("kitchenPassword must be a string")
    .isLength({ min: 8 })
    .withMessage("kitchenPassword must be between 6 and 20 characters long"),
  body("kitchenStatus")
    .optional()
    .isString()
    .withMessage("kitchenStatus must be a string")
    .isIn(["open", "closed"])
    .withMessage("choose between open or closed"),
  body("kitchenRating")
    .optional()
    .isNumeric()
    .withMessage("kitchenRating must be a number")
    .isLength({ min: 0, max: 5 })
    .withMessage("kitchenRating must be between 0 and 5"),
  body("kitchenImage")
    .optional()
    .isString()
    .withMessage("kitchenImage must be a string"),
  // .isLength({ min: 3, max: 50 })
  // .withMessage("kitchenImage must be between 3 and 50 characters long"),
  body("kitchenAddress.zone")
    // .optional()
    .notEmpty()
    .withMessage("kitchenAddress.zone is required")
    .isString()
    .withMessage("kitchenAddress.zone must be a string"),
  // .isLength({ min: 3, max: 50 })
  // .withMessage(
  //   "kitchenAddress.zone must be between 3 and 50 characters long"
  // ),
  body("kitchenAddress.street")
    // .optional()
    .notEmpty()
    .withMessage("kitchenAddress.street is required")
    .isString()
    .withMessage("kitchenAddress.street must be a string"),
  body("menuId").optional().isNumeric().withMessage("menu id must be Number"),
  body("kitchenAddress.buildingNumber")
    .notEmpty()
    .withMessage("kitchenAddress.buildingNumber is required")
    .isNumeric()
    .withMessage("kitchenAddress.buildingNumber must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage(
      "kitchenAddress.buildingNumber must be between 1 and 5 digits long"
    ),
  body("kitchenAddress.floor")
    .optional()
    .isNumeric()
    .withMessage("kitchenAddress.floor must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("kitchenAddress.floor must be between 1 and 5 digits long"),
  body("kitchenAddress.apartment")
    .optional()
    .isString()
    .withMessage("kitchenAddress.apartmentNumber must be a string")
    .isLength({ min: 1, max: 5 })
    .withMessage(
      "kitchenAddress.apartmentNumber must be between 1 and 5 digits long"
    ),
];

exports.kitchenValidationUpdate = [
  body("kitchenName")
    .optional()
    .isString()
    .withMessage("kitchenName must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("kitchenName must be between 3 and 50 characters long"),
  body("kitchenCategeory")
    .optional()
    .isString()
    .withMessage("kitchenCategeory must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("kitchenCategeory must be between 3 and 50 characters long"),
  body("menuId").optional().isNumeric().withMessage("menu id must be number"),
  body("kitchenPhone")
    .optional()
    .isNumeric()
    .withMessage("kitchenPhone must be a number")
    .isLength({ min: 5, max: 11 })
    .withMessage("kitchenPhone must be 11 digits long"),
  body("kitchenEmail")
    .optional()
    .isEmail()
    .withMessage("kitchenEmail must be a valid email")
    .isLength({ min: 3, max: 50 })
    .withMessage("kitchenEmail must be between 3 and 50 characters long"),
  body("kitchenPassword")
    .optional()
    .isString()
    .withMessage("kitchenPassword must be a string")
    .isLength({ min: 8 })
    .withMessage("kitchenPassword must be between 6 and 20 characters long"),
  body("kitchenStatus")
    .optional()
    .isString()
    .withMessage("kitchenStatus must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("kitchenStatus must be between 3 and 50 characters long"),
  body("kitchenRating")
    .optional()
    .isNumeric()
    .withMessage("kitchenRating must be a number")
    .isLength({ min: 0, max: 5 })
    .withMessage("kitchenRating must be between 0 and 5"),
  body("kitchenImage")
    .optional()
    .isString()
    .withMessage("kitchenImage must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("kitchenImage must be between 3 and 50 characters long"),
  body("kitchenAddress.zone")
    .optional()
    .isString()
    .withMessage("kitchenAddress.zone must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "kitchenAddress.zone must be between 3 and 50 characters long"
    ),
  body("kitchenAddress.street")
    .optional()
    .isString()
    .withMessage("kitchenAddress.street must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "kitchenAddress.street must be between 3 and 50 characters long"
    ),
  body("kitchenAddress.buildingNumber")
    .optional()
    .isNumeric()
    .withMessage("kitchenAddress.buildingNumber must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage(
      "kitchenAddress.buildingNumber must be between 1 and 5 digits long"
    ),
  body("kitchenAddress.floor")
    .optional()
    .isNumeric()
    .withMessage("kitchenAddress.floor must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("kitchenAddress.floor must be between 1 and 5 digits long"),
  body("kitchenAddress.apartment")
    .optional()
    .isString()
    .withMessage("kitchenAddress.apartmentNumber must be a string")
    .isLength({ min: 1, max: 5 })
    .withMessage(
      "kitchenAddress.apartmentNumber must be between 1 and 5 digits long"
    ),
];

exports.kitchenValidationDelete = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number")
    .isLength({ min: 1, max: 50 })
    .withMessage("kitchenId must be between 3 and 50 characters long"),
];

exports.kitchenValidationDeleteOrder = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("kitchenId must be between 3 and 50 characters long"),
];
