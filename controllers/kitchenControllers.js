const mongoose = require("mongoose");
require("../models/kitchenSchema");
const Kitchen = mongoose.model("kitchens");
const bcrypt = require("bcrypt");

//get All kitchen
module.exports.getAllkitchen = (req, res, next) => {
  Kitchen.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get Kitchen by Id
module.exports.getkitchenById = (req, res, next) => {
  Kitchen.findOne({ _id: req.params.id })
    .populate({
      path: "menuId",
      select: {
        _id: 0,
        kitchen: 0,
      },
      populate: [
        {
          path: "menuItems",
          select: {
            kitchenId: 0,
          },
        },
      ],
    })
    .then((data) => {
      if (data == null) next(new Error("kitchen not found"));
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
// module.exports.getKitchenOrders = (req, res, next) => {
//     Kitchen.findOne({ _id: req.params.id })
//         .populate({ path: "orders" })
//         .then(data => {
//             res.status(200).json(data)
//         }
//         ).catch(error => {
//             next(error)
//         }
//         )

//create new Kitchen
module.exports.createNewKitchen = (req, res, next) => {
  // <<<<<<< HEAD
  //   let path;
  //   bcrypt.hash(req.body.kitchenPassword, 10).then((hashpass) => {
  //    if( `./avatars/images/${req.file.filename}`){
  //     path = `./avatars/images/${req.file.filename}`
  //    }
  //    else{
  //     path=req.body.kitchenImage
  //    }

  // =======
  let path = "";
  if (req.file) {
    path = `http://localhost:8080/avatars/images/${req.file.filename}`;
  } else {
    path = "https://www.w3schools.com/howto/img_avatar.png";
  }
  bcrypt.hash(req.body.kitchenPassword, 10).then((hashpass) => {
    let kitchenObject = new Kitchen({
      kitchenName: req.body.kitchenName,
      kitchenCategeory: req.body.kitchenCategeory,
      kitchenAddress: req.body.kitchenAddress,
      kitchenPhone: req.body.kitchenPhone,
      kitchenEmail: req.body.kitchenEmail,
      kitchenImage: path,
      kitchenPassword: hashpass,
      kitchenOrders: req.body.kitchenOrders,
      kitchenRating: req.body.kitchenRating,
      menuId: req.body.menuId,
    });
    kitchenObject
      .save()
      .then((data) => {
        console.log(req.body);
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        next(error);
      });
  });
};

//update kitchen

module.exports.updateKitchen = (req, res, next) => {
  Kitchen.findOne({ _id: req.params.id })
    .then((data) => {
      let bodyData = req.body;
      if (req.file) {
        // .then(data)
        data.kitchenImage = `http://localhost:8080/avatars/images/${req.file.filename}`;
        return data.save().then(res.status(200).json({ data: data }));
      } else {
        for (let key in bodyData) {
          if (key == "kitchenOrders") {
            if (
              !data.kitchenOrders.includes(bodyData.kitchenOrders) &&
              bodyData.kitchenOrders != null &&
              bodyData.kitchenOrders.length == 1
            ) {
              data.kitchenOrders.push(...bodyData.kitchenOrders);
            } else {
              throw new Error("only one unique order is allowed");
            }
          } else if (
            key === "street" ||
            key === "zone" ||
            key === "notes" ||
            key === "buildingNumber" ||
            key === "floor" ||
            key === "apartment"
          ) {
            data.kitchenAddress[key] = bodyData[key];
          }
          // } else if (key === "menuId") {
          //   continue;
          // }
          else {
            data[key] = bodyData[key];
          }
        }
        return data.save().then(res.status(200).json({ data: data }));
      }
    })

    .catch((error) => {
      next(error);
    });
};

//delete kitchen

module.exports.deleteKitchen = (req, res, next) => {
  Kitchen.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("Kitchen not found"));
      } else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteKitchenOrders = (req, res, next) => {
  Kitchen.updateOne(
    { _id: req.params.id },
    { $pull: { kitchenOrders: { $eq: req.body.kitchenOrders } } }
  ).then((data) => {
    console.log(data);
    if (data.modifiedCount == 0) next(new Error("order not found"));
    else res.status(200).json({ data: "order deleted" });
  });
};
//get kitchen orders

module.exports.getKitchenOrders = (req, res, next) => {
  Kitchen.findOne({ _id: req.params.id })
    .populate({
      path: "kitchenOrders",
      populate: [
        {
          path: "userid",
          select: {
            _id: 0,
            userFullName: 1,
            userPhone: 1,
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
        {
          path: "deliverypilot",
          select: {
            _id: 0,
            pilotName: 1,
            pilotPhone: 1,
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
// get kitchen by name
module.exports.getkitchenByName = (req, res, next) => {
  Kitchen.find({ kitchenName: req.params.kitchenName })
    .then((data) => {
      if (data.length == 0) next(new Error("Kitchen not found"));
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
