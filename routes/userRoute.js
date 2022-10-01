const express = require("express");
const mwError = require("../MW/validatiomMW");
const userController = require("../controllers/userController");
const router = express.Router();
const authMw = require("../MW/authMw");
const {
  userValaidationAdd,
  userValaidationUpdate,
  userValaidationDelete,
  userValidationDeleteOrder,
} = require("../MW/userMW");

router
  .route("/user")
  .get(
    (req, res, next) => {
      next();
    },

    userController.getAllUsers
  )

  .post(userValaidationAdd, mwError, userController.addUser);

router
  .route("/user/:id")
  .all(authMw, (req, res, next) => {
    if (
      (req.role == "user" || req.role == "admin") &&
      req.id == req.params.id
    ) {
      console.log("user id", req.id);
      next();
    } else {
      let error = new Error("not authorized");
      error.status = 403;
      next(error);
    }
  })
  .get(mwError, userController.getUserById)

  .put(userValaidationUpdate, mwError, userController.updateUserById)

  .delete(userValaidationDelete, mwError, userController.deleteUserById);
// router.route("/user-cancel-order/:id")
router
  .route("/userOrders/:id")
  .all(authMw, (req, res, next) => {
    if (
      (req.role == "user" || req.role === "admin") &&
      req.id == req.params.id
    ) {
      console.log("user id", req.id);
      next();
    } else {
      let error = new Error("not authorized");
      error.status = 403;
      next(error);
    }
  })
  .get(userController.getUserOrders)
  .delete(userValidationDeleteOrder, mwError, userController.deleteUserOrder);

module.exports = router;
