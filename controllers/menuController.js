const mongoose = require("mongoose");
require("../models/menuSchema");
const Menu = mongoose.model("menus");

module.exports.getAllMenu = (req, res, next) => {
  Menu.find({})
    .populate((path = "menuItems"))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getMenuById = (req, res, next) => {
  Menu.findOne({ _id: req.params.id })
    .populate({
      path: "menuItems",
      select: {
        _id: 0,
      },
    })
    .populate({
      path: "kitchen",
      select: {
        _id: 0,
        kitchenName: 1,
        "kitchenAddress.zone": 1,
      },
    })

    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createNewMenu = (req, res, next) => {
  let menuObject = new Menu({
    kitchen: req.body.kitchen,
    menuItems: req.body.menuItems,
  });
  menuObject
    .save()
    .then((data) => {
      res.status(201).json({ data: data });
    })
    .catch((error) => next(error));
};

module.exports.updateMenuById = (req, res, next) => {
  Menu.findOne({ kitchen: req.params.id })
    .then((data) => {
      console.log(data);
      let bodyData = req.body;
      console.log(bodyData);

      for (let key in bodyData) {
        if (key == "menuItems") {
          if (
            !data.menuItems.includes(bodyData.menuItems) &&
            bodyData.menuItems != null &&
            bodyData.menuItems.length == 1
          ) {
            console.log("body" + req.body.menuItems);
            console.log("data" + data.menuItems);
            data.menuItems.push(...bodyData.menuItems);
          } else {
            throw new Error(
              "only one menu item can be added and it should be unique"
            );
          }
        } else {
          throw new Error("key is not valid");
          //   data[key] = bodyData[key];
        }
      }
      return data.save().then(res.status(200).json({ data: data }));
    })

    .catch((error) => {
      next(error);
    });
};

module.exports.deleteMenuItemById = (req, res, next) => {
  Menu.updateOne(
    { kitchen: req.params.id },
    { $pull: { menuItems: { $eq: req.params.menuItems } } }
  ).then((data) => {

    if (data.modifiedCount == 0) next(new Error("item not found"));
    else res.status(200).json({ data: "item deleted" });
  });
};

module.exports.deleteMenuById = (req, res, next) => {
  Menu.deleteOne({ kitchen: req.params.id })
    .then((data) => {
      if (data.deletedCount == 0) next(new Error("Menu not found"));
      else res.status(200).json({ data: "Menu deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
