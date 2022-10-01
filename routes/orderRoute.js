const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
const mwError = require("../MW/validatiomMW");
const authMW = require("../MW/authMW");
const {
  orderValidationAdd,
  orderValidationUpdate,
  orderValidationDelete,
  orderItemValidationDelete,
} = require("../MW/orderMW");

router
  .route("/orders")
  .get(
    authMW,
    (req, res, next) => {
      if (req.role === "admin") {
        next();
      } else {
        res.status(403).json({ msg: "just Admins can access this route " });
      }
    },
    orderController.getAllOrder
  )

  .post(
    authMW,
    (req, res, next) => {
      if (req.role === "user" || req.role === "admin") {
        next();
      } else {
        res.status(403).json({
          message: "You are not authorized to access this resource.",
        });
      }
    },
    orderValidationAdd,
    mwError,
    orderController.createNewOrder
  );
router
  .route("/order/:id")

  .all(authMW, (req, res, next) => {
    if (
      req.role == "kitchen" ||
      req.role == "user" ||
      // req.orders.includes(Number(req.params.id))) ||
      req.role == "admin" ||
      req.role == "pilot"
    ) {
      console.log("req.orders: ", req.orders);
      console.log("order request", req.orders.includes(Number(req.params.id)));
      console.log("order", req.body);
      next();
    } else {
      // console.log("role",req.role)
      // console.log("params id",req.params.id)
      // console.log("kitchen orders",req.orders)
      // console.log("order",req.body)
      // console.log("include",req.orders.includes(Number(req.params.id)))

      res.status(403).json({
        message: "You are not authorized to access this resource from order.",
      });
    }
  })
  .get(mwError, orderController.getOrderById)
  .put(orderValidationUpdate, mwError, orderController.updateOrderById)
  .delete(orderValidationDelete, mwError, orderController.deleteOrderById);

router
  .route("/orderItems/:id")
  .delete(
    orderItemValidationDelete,
    mwError,
    orderController.deleteOrderItemById
  )

  .post(
    authMW,
    (req, res, next) => {
      if (req.role === "user" || req.role === "admin") {
        next();
      } else {
        res.status(403).json({
          message: "You are not authorized to access this resource.",
        });
      }
    },
    orderValidationAdd,
    mwError,
    orderController.createNewOrder
  );
router
  .route("/order/:id")

  .all(authMW, (req, res, next) => {
    if (
      ((req.role == "kitchen" || req.role == "user") &&
        req.orders.includes(Number(req.params.id))) ||
      req.role == "admin" ||
      req.role == "pilot"
    ) {
      console.log("req.orders: ", req.orders);
      console.log("order request", req.orders.includes(Number(req.params.id)));
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized to access this resource.",
      });
    }
  })
  .get(mwError, orderController.getOrderById)
  .put(orderValidationUpdate, mwError, orderController.updateOrderById)
  .delete(orderValidationDelete, mwError, orderController.deleteOrderById);

router
  .route("/orderItems/:id")
  .delete(
    orderItemValidationDelete,
    mwError,
    orderController.deleteOrderItemById
  );
router.route("/onlineOrders").get(orderController.getOnlineOrders);
router
  .route("/pilotHistoryOrders/:nationalID")
  .get(orderController.getDeliveredOrders);
router
  .route("/pilotOnlineOrders/:nationalID")
  .get(orderController.getPilotOnlineOrders);
router
  .route("/kitchenPendingOrders/:id")
  .get(orderController.getKitchenPendingOrders);
router
  .route("/kitchenCurrentOrders/:id")
  .get(orderController.getKitchenCurrentOrders);
router
  .route("/kitchenHistoryOrders/:id")
  .get(orderController.getKitchenHistoryOrders);

module.exports = router;
