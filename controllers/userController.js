const mongoose = require("mongoose");
require("../models/userSchema");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })

    .then((data) => {
      if (data == null) next(new Error("User is not found"));
      else res.status(200).json(data);
    })

    .catch((error) => {
      next(error);
    });
};

module.exports.getUserOrders = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .populate({
      path: "userOrder",
      populate: [
        {
          path: "kitchen",
          model: "kitchens",
          select: {
            _id: 0,
            kitchenName: 1,
            kitchenAddress: 1,
            kitchenPhone: 1,
          },
        },
        {
          path: "deliverypilot",
          select: {
            _id: 0,
            pilotName: 1,
            pilotNumber: 1,
          },
        },
        {
          path: "orderItems",
          select: {
            itemName: 1,
            itemPrice: 1,
          },
        },
      ],
    })

    .then((data) => {
      res.status(200).json(data);
    })

    .catch((error) => {
      next(error);
    });
};
module.exports.addUser = (req, res, next) => {
  bcrypt.hash(req.body.userPassword, 10).then((hashpass) => {
    let UserObject = new User({
      userFullName: req.body.userFullName,
      userEmail: req.body.userEmail,
      userPassword: hashpass,
      userPhone: req.body.userPhone,
      userAddress: req.body.userAddress,
      userOrder: req.body.userOrder,
    });
    UserObject.save()
      .then((data) => {
        console.log(data);
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        next(error);
      });
  });
};

module.exports.updateUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      let bodyData = req.body;
      for (let key in bodyData) {
        if (key == "userOrder") {
          if (
            !data.userOrder.includes(bodyData.userOrder) &&
            bodyData.userOrder != null &&
            bodyData.userOrder.length == 1
          ) {
            data.userOrder.push(...bodyData.userOrder);
          } else {
            throw new Error("only one unique order is allowed");
          }
        } else if (
          key === "street" ||
          key === "zone" ||
          key === "notes" ||
          key === "building" ||
          key === "floor" ||
          key === "apartment"
        ) {
          data.userAddress[key] = bodyData[key];
        } else {
          data[key] = bodyData[key];
        }
      }
      return data.save().then(res.status(200).json({ data: "updated" }));
    })

    .catch((error) => {
      next(error);
    });
};
module.exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount == 0) next(new Error("Pilot not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.deleteUserOrder = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    { $pull: { userOrder: { $eq: req.body.userOrder } } }
  ).then((data) => {
    console.log(data);
    if (data.modifiedCount == 0) next(new Error("order not found"));
    else res.status(200).json({ data: "order deleted" });
  });
};
