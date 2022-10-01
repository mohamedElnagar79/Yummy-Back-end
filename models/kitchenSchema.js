const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//address schema:
const kitchenAddressSchema = new mongoose.Schema({
  zone: {
    type: String,
     required: true
  },
  street: {
    type: String,
    required: true
  },
  buildingNumber: {
    type: Number,
    required: true
  },
  floor: { type: Number },
  apartment: { type: String },
  notes: { type: String },
});

//kitchen  schema:
const kitchenSchema = new mongoose.Schema({
  _id: { type: Number },
  kitchenName: { type: String, required: true, maxlength: 50 },
  kitchenCategeory: {
    type: String,
    required: true,
    default: "all",
    enum: ["vegetarian", "non-vegetarian", "frozen", "all"],
  },
  menuId: { type: Number, ref: "menus", default: 0 },
  kitchenAddress: { type: kitchenAddressSchema, _id: false },
  kitchenPhone: {
    type: Number,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 11,
  },
  kitchenEmail: {
    type: String,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  kitchenPassword: { type: String, required: true, minlength: 8 },
  kitchenStatus: { type: String, default: "closed", enum: ["closed", "open"] },
  kitchenRating: { type: Number, default: 0, max: 5, min: 0 },
  kitchenImage: {
    type: String,
    required: true,
    default: "./avatars/images/1659181873940.jpg",
  },
  kitchenOrders: [{ type: Number, ref: "orders", required: true, default: [] }],
});

//using autoIncrement plugin:
kitchenSchema.plugin(AutoIncrement, { id: "kitchensCounter" });

//mapping:
module.exports = mongoose.model("kitchens", kitchenSchema);
