const { body, param, query } = require("express-validator");

exports.orderValidationAdd = [
    body("totalPrice")
        .isNumeric()
        .withMessage("totalPrice must be a number"),
    body("userid")
        .isNumeric()
        .withMessage("userid must be a number"),
    body("kitchen")
        .isNumeric()
        .withMessage("kitchen must be a number"),
    body("orderItems")
        .notEmpty()
        .withMessage("orderItems can't be empty")
        .isArray(Number)
        .withMessage("orderItems must be an array"),
];

exports.orderValidationUpdate = [
    body("totalPrice")
        .optional()
        .isNumeric()
        .withMessage("totalPrice must be a number"),
    body("userid")
        .optional()
        .isNumeric()
        .withMessage("userid must be a number"),
    body("kitchen")
        .optional()
        .isNumeric()
        .withMessage("kitchen must be a number"),
    body("deliverypilot")
        .optional()
        .isNumeric()
        .withMessage("deliverypilot must be a number"),
    body("orderItems")
        .optional()
        .isArray(Number)
        .withMessage("orderItems must be an array"),
    body("pilotOrderStatus")
    .optional()
    .isIn(["waiting", "on the way", "dilevered"])
    .withMessage("pilot order status must be one of the following: waiting, in the way, dilevered"),
    body("kitchenOrderStatus")
        .optional()
        .isIn(["pending", "accepted", "inProgress", "rejected", "completed"])
        .withMessage("kitchen order status must be one of the following: pending, inProgress, completed, cancelled"),
];


exports.orderValidationDelete = [
    param("id")
        .isNumeric()
        .withMessage("id must be a number"),
];

exports.orderItemValidationDelete = [
    param("id")
        .isNumeric()
        .withMessage("id must be a number"),
    query("orderItems")
        .isArray(Number)
        .withMessage("orderItems must be an array")

]





