const mongoose = require("mongoose");
require("../models/itemSchema");
const Item = mongoose.model("items");

//get all items
module.exports.getAllItem = (req, res, next) => {
  Item.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
//get item by id
module.exports.getItemById = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .then((data) => {
      // console.log(data)
      if (data == null) next(new Error("item not found"));
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
//create new item
module.exports.createNewItem = (req, res, next) => {
  let path = "";
  if (req.file) {
    path = `http://localhost:8080/avatars/images/${req.file.filename}`;
  } else {
    path = "https://www.w3schools.com/howto/img_avatar.png";
  }
  let itemObject = new Item({
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemImage: path,
    itemStatus: req.body.itemStatus,
    itemCatogery: req.body.itemCatogery,
    kitchenId: req.body.kitchenId,
  });
  itemObject
    .save()
    .then((data) => {
      res.status(201).json({ data: data });
    })
    .catch((error) => next(error));
};
//update item by id
module.exports.updateItemById = (req, res, next) => {
  if (req.file) {
    Item.findOne({ _id: req.params.id, kitchenId: req.params.kitchenId }).then(
      (data) => {
        data.itemImage = `http://localhost:8080/avatars/images/${req.file.filename}`;
        // console.log("image", data.itemImage);
        if (data === null) next(new Error("item not found"));
        return data.save().then(res.status(200).json({ data: data }));
      }
    );
  } else
    Item.updateOne(
      { _id: req.params.id, kitchenId: req.params.kitchenId },
      {
        $set: req.body,
      }
    )
      .then((data) => {
        console.log("data", data);
        console.log("body", req.body);
        console.log("file", req.file);
        console.log("params", req.params.id);
        if (data.modifiedCount == 0) next(new Error("Item not found"));
        else res.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
};
//delete item by id
module.exports.deleteItemById = (req, res, next) => {
  Item.deleteOne({ _id: req.params.id, kitchenId: req.params.kitchenId })
    .then((data) => {
      if (data.deletedCount == 0) next(new Error("Item not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
//get item by catogery
module.exports.getItemByCatogery = (req, res, next) => {
  Item.find({ itemCatogery: req.params.itemCatogery })
    .then((data) => {
      if (data.length == 0) next(new Error("Item not found"));
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get item by name
module.exports.getItemByName = (req, res, next) => {
  Item.find({ itemName: req.params.itemName })
    .then((data) => {
      if (data.length == 0) next(new Error("Item not found"));
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
