const express = require("express");
const KitchenController = require("./../controllers/kitchenControllers");
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const authMw = require("../MW/authMw");
const {
  kitchenValidationAdd,
  kitchenValidationUpdate,
  kitchenValidationDelete,
  kitchenValidationDeleteOrder,
} = require("../MW/kitchenMW");

router
  .route("/kitchen/:id")
  .get(KitchenController.getkitchenById)

  // .all(authMw, (req, res, next) => {


  //   if (
  //     (req.role == "kitchen" && req.id == req.params.id) ||
  //     req.role == "admin"
  //   ) {
  //     // console.log("kitchen id", req.id);
  //     next();
  //   } else {
  //     let error = new Error("not authorized");
  //     error.status = 403;
  //     next(error);
  //   }
  // })

 

  .put(kitchenValidationUpdate, mwError, KitchenController.updateKitchen)
  .delete(kitchenValidationDelete, mwError, KitchenController.deleteKitchen);

router
  .route("/kitchen")

  .get(mwError, KitchenController.getAllkitchen)

  .post(kitchenValidationAdd, mwError, KitchenController.createNewKitchen);

router
  .route("/kitchenOrders/:id")
  .all(
    authMw, (req, res, next) => {
    if (
      (req.role == "kitchen" && req.id == req.params.id) ||
      req.role == "admin"
    ) {
      console.log("kitchen id", req.id);
      next();
    } else {
      let error = new Error("not authorized");
      error.status = 403;
      next(error);
    }
  })
  .get(KitchenController.getKitchenOrders)
  .delete(
    kitchenValidationDeleteOrder,
    mwError,
    KitchenController.deleteKitchenOrders
  );

router
  .route("/kitchenSearch/:kitchenName")
  .get(KitchenController.getkitchenByName);

module.exports = router;
