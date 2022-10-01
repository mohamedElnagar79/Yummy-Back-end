const ItemController = require("../controllers/itemController");
const express = require("express");
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const authMW = require("../MW/authMW");
const {
  itemValidationAdd,
  itemValidationUpdate,
  itemValidationDelete,
} = require("../MW/itemMW");

router
  .route("/item")
  .get(
    authMW,
    (req, res, next) => {
      if (req.role === "admin") {
        next();
      } else {
        res.status(403).json({ msg: "just Admins can access this route " });
      }
    },
    mwError,
    ItemController.getAllItem
  )
  .post(
    authMW,
    (req, res, next) => {
      if (
        (req.role == "kitchen" && req.id == req.body.kitchenId) ||
        req.role == "admin"
      ) {
        next();
      } else {
        next(new Error("Unauthorized"));
      }
    },
    itemValidationAdd,
    mwError,
    ItemController.createNewItem
  );

router
  .route("/menuItem/:id/:kitchenId")
  .get(mwError, ItemController.getItemById)
  .all(
    authMW, (req, res, next) => {
    if (
      (req.role == "kitchen" && req.id == req.params.kitchenId) ||
      req.role == "admin"
    ) {
      next();
    } else {
      // error.status = 403;
      next(new Error("Unauthorized"));

    }
  })
  .put(itemValidationUpdate, mwError, ItemController.updateItemById)
  .delete(itemValidationDelete, mwError, ItemController.deleteItemById);

router
  .route("/menu/itemName/:itemName")
  .get(mwError, ItemController.getItemByName);

router
  .route("/menu/item/catogery/:catogery")
  .get(mwError, ItemController.getItemByCatogery);

module.exports = router;
