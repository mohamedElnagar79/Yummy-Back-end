const MenuController = require("../controllers/menuController");
const express = require("express");
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const authMw = require("../MW/authMw");
const {
  menuValidationAdd,
  menuValidationUpdate,
  menuValidationdelete,
  menuValidationDeleteMenuItem,
} = require("../MW/menuMW");

router
  .route("/menu")
  .get(
    authMw,
    (req, res, next) => {
      if (req.role == "admin") {
        next();
      } else {
        next(new Error("Unauthorized"));
      }
    },
    menuValidationAdd,
    MenuController.getAllMenu
  )
  .post(
    authMw,
    (req, res, next) => {
      if (req.role == "kitchen") {
        next();
      } else {
        next(new Error("Unauthorized"));
      }
    },
    menuValidationAdd,
    mwError,
    MenuController.createNewMenu
  );

router
  .route("/menu/:id")

  .all(authMw, (req, res, next) => {
    if (
      (req.role == "kitchen" && req.id == req.params.id) ||
      req.role == "admin"
    ) {
      next();
    } else {
      let error = new Error("not authorized");
      error.status = 403;
      next(error);
    }
  })
  .get(mwError, MenuController.getMenuById)
  .put(menuValidationUpdate, mwError, MenuController.updateMenuById)
  .delete(menuValidationdelete, mwError, MenuController.deleteMenuById);

router
  .route("/menu/item/:id/:menuItems")

  .delete(
    authMw,
    (req, res, next) => {
      if (
        (req.role == "kitchen" && req.id == req.params.id) ||
        req.role == "admin"
      ) {
        next();
      } else {
        let error = new Error("not authorized");
        error.status = 403;
        next(error);
      }
    },
    menuValidationDeleteMenuItem,
    mwError,
    MenuController.deleteMenuItemById
  );

module.exports = router;
