const express = require("express");
const { body, param, query } = require("express-validator");
const mwError = require("../MW/validatiomMW");
const router = express.Router();
const pilotController = require("../controllers/pilotController");
const authMw = require("../MW/authMw");
const { pilotValidationDeleteOrder, pilotsValidationAdd, pilotsValidationUpdate, pilotsValidationDelete } = require("../MW/pilotMW");
const authMW = require("../MW/authMw");



//image 

// get all pilots
router.route("/pilot")

    .get(authMW,
        (req, res, next) => {
            if (req.role === "admin") {
                next();
            }
            else {
                res.status(403).json({ msg: "just Admins can access this route " })
            }
        }
        , pilotController.getAllpilots)


// sign up pilots
router.route("/pilot/signUp")

    .post(pilotsValidationAdd, mwError,

        pilotController.addPilot)

// get pilot by nationalID
router.route("/pilot/:nationalID")
    .all(authMw, (req, res, next) => {
        if (((req.role == "pilot") && req.id == req.params.nationalID)
            || (req.role == "admin")) {
            next();
        }
        else {
            let error = new Error("not authorized");
            error.status = 403;
            next(error);
        }
    }
    )
    .get(pilotController.getpilotById)

    .put(pilotsValidationUpdate, mwError, pilotController.updateById)
    .delete(pilotsValidationDelete, mwError, pilotController.deleteById)

router.route("/pilotOrders/:nationalID")
    .all(authMw, (req, res, next) => {
        if ((((req.role == "pilot")  && (req.id == req.params.nationalID) )|| (req.role == "admin"))) {
            next();
        }
        else {
            let error = new Error("not authorized");
            error.status = 403;
            next(error);
        }
    }
    )
    .get(pilotController.getPilotOrders)
    .delete(pilotValidationDeleteOrder, mwError, pilotController.deletePilotOrder)


module.exports = router; 