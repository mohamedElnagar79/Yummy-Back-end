const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);


// const categorySchema = new mongoose.Schema({
//     _id: { type: Number },
//     categoryName: { type: String, required: true, minlength: 2, maxlength: 50 },
//     categoryItems: [{ type: Number, required: true, _id: false, ref: "items" }],


// });
const menuSchema = new mongoose.Schema({
    _id: { type: Number },
    kitchen: { type: Number, required: true, ref: "kitchens", unique: true },
    menuItems: [{ type: Number, required: true, _id: false, ref: "items" }],
}
    ,
    { _id: false }

);



menuSchema.plugin(autoIncrement, { id: "menuCounter" });

// categorySchema.plugin(autoIncrement, { id: "categoryCounter" });
module.exports = mongoose.model("menus", menuSchema);
// module.exports = mongoose.model("items", itemSchema);
