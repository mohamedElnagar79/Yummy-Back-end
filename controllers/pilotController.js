const mongoose = require("mongoose");
require("../models/pilotSchema");
let Pilot = mongoose.model("pilots");
const bcrypt = require("bcrypt");

// get all piltos
module.exports.getAllpilots = (req, res, next) => {
  Pilot.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

// get pilots by ID
module.exports.getpilotById = (req, res, next) => {
  Pilot.findOne({ _id: req.params.nationalID })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//add pilot
module.exports.addPilot = (req, res, next) => {
  bcrypt.hash(req.body.pilotPassword, 10).then((hashpass) => {
    let path = "";
    if (req.file) {
      path = `http://localhost:8080/avatars/images/${req.file.filename}`;
    } else {
      path = "https://www.w3schools.com/howto/img_avatar.png";
    }
    let pilotObject = new Pilot({
      _id: req.body.nationalID,
      pilotStatus: req.body.pilotStatus,
      pilotName: req.body.pilotName,
      orders: req.body.orders,
      pilotNumber: req.body.pilotNumber,
      pilotNotes: req.body.pilotNotes,
      pilotLisenceImage: path,
      pilotPassword: hashpass,
    });

    pilotObject
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        next(error);
      });
  });
};

module.exports.updateById = (req, res, next) => {
  Pilot.findOne({ _id: req.params.nationalID })
    .then((data) => {
      console.log("dataa",data);
      let bodyData = req.body;
      console.log("body",bodyData);
      if (req.file) {
        data.pilotLisenceImage = `http://localhost:8080/avatars/images/${req.file.filename}`;
        return data.save().then(res.status(200).json({ data: "updated" }));
      } else {
        for (let key in bodyData) {
          if (key == "orders") {
            if (
              !data.orders.includes(bodyData.orders) &&
              bodyData.orders != null &&
              bodyData.orders.length === 1
            ) {
              console.log("body" + req.body.orders);
              console.log("data" + data.orders);
              data.orders.push(...bodyData.orders);
            } else {
              throw new Error("orders should be unique");
            }
          } else if (key === "pilotPassword") {
            throw new Error("Can't Change Password Now");
          } else {
            data[key] = bodyData[key];
          }
        }
        return data
          .save()
          .then(res.status(200).json({ data: "updated", data }));
      }
    })

    .catch((error) => {
      next(error);
    });
};

module.exports.deleteById = (req, res, next) => {
  Pilot.deleteOne({ _id: req.params.nationalID })
    .then((data) => {
      if (data.deletedCount == 0) next(new Error("Pilot not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deletePilotOrder = (req, res, next) => {
  Pilot.updateOne(
    { _id: req.params.nationalID  },
    { $pull: { orders: { $eq: req.body.orders } } }
  ).then((data) => {
    console.log(data);
    if (data.modifiedCount == 0) next(new Error("orders not found"));
    else res.status(200).json({ data: "orders deleted" });
  });
};

module.exports.getPilotOrders = (req, res, next) => {
  Pilot.findOne({ _id: req.params.nationalID  })
    .populate({
      path: "orders",
      populate: [
        {
          path: "userid",
          select: {
            _id: 0,
            userFullName: 1,
            userAddress: 1,
            userPhone: 1,
          },
        },
        {
          path: "kitchen",
          select: {
            _id: 0,
            kitchenName: 1,
            kitchenAddress: 1,
            kitchenPhone: 1,
          },
        },
        {
          path: "orderItems",
          select: {
            _id: 0,
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
