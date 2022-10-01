const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const itemSchema = new mongoose.Schema({
  _id: { type: Number },
  itemName: { type: String, required: true },
  itemDescription: { type: String },
  itemPrice: { type: Number, required: true },
  itemImage: {
    type: String,
    required: true,
    default: "https://www.w3schools.com/howto/img_avatar.png",
  },
  itemStatus: {
    type: String,
    required: true,
    default: "not avilable",
    enum: ["avilable", "not avilable"],
  },
  itemCatogery: { type: String, required: true },
  kitchenId: { type: Number, required: true, ref: "Kitchen" },
});

itemSchema.plugin(autoIncrement, { id: "itemCounter" });
module.exports = mongoose.model("items", itemSchema);
