const User = require("../models/userSchema");
const kitchen = require("../models/kitchenSchema");
const pilot = require("../models/pilotSchema");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const adminUserName = "admin";
const adminPassword = "admin";
module.exports.login = (req, res, next) => {
  if (req.body.role === "user") {
    // console.log("hi");
    User.findOne({
      userEmail: req.body.email,
    })

      .then((data) => {
        console.log("data is ==========>", data);

        bycrypt
          .compare(req.body.password, data.userPassword)
          .then((isEqual) => {
            if (!isEqual) {
              res.status(401).json({ data: "invalid email or password" });
            } else {
              let token = jwt.sign(
                {
                  orders: data.userOrder,
                  id: data._id,
                  role: "user",
                  userEmail: req.body.email,
                },
                process.env.secret,
                { expiresIn: "1d" }
              );
              // console.log(data._id)
              res.status(200).json({ token, data, id: data._id, msg: "login" });
              // console.log("login", res)
            }
          });
      })
      .catch((error) => next(error));
  } else if (req.body.role == "kitchen") {
    kitchen
      .findOne({
        kitchenEmail: req.body.email,
      })

      .then((data) => {
        bycrypt
          .compare(req.body.password, data.kitchenPassword)
          .then((isEqual) => {
            if (!isEqual) {
              res.status(401).json({ data: "invalid email or password" });
            } else {
              let token = jwt.sign(
                {
                  orders: data.kitchenOrders,
                  id: data._id,
                  role: "kitchen",
                  kitchenEmail: req.body.email,
                },
                process.env.secret,
                { expiresIn: "1d" }
              );
              // console.log("our id",{id:data._id})
              res.status(200).json({ token, data, msg: "login" });
            }
          });
      })
      .catch((error) => next(error));
  } else if (req.body.role == "pilot") {
    pilot
      .findOne({
        _id: req.body.email,
        // _id: req.body.email
      })

      .then((data) => {
        bycrypt
          .compare(req.body.password, data.pilotPassword)
          .then((isEqual) => {
            if (!isEqual) {
              res.status(401).json({ data: "invalid email or password" });
            } else {
              let token = jwt.sign(
                {
                  orders: data.orders,
                  id: data._id,
                  role: "pilot",
                  _id: req.body.email,
                },

                process.env.secret,
                { expiresIn: "1d" }
              );
              // console.log("our id",{id:data._id})
              res.status(200).json({ token, data, msg: "login" });
            }
          });
      })
      .catch((error) => next(error));
  } else if (
    req.body.email == adminUserName &&
    req.body.password == adminPassword
  ) {
    let token = jwt.sign(
      {
        role: "admin",
      },
      process.env.secret,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token });
  } else {
    throw new Error("role not found");
  }
};
