const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)
const addressSchema = new mongoose.Schema({
    zone: { type: String, required: false },
    street: { type: String, required: false },
    building: { type: String, required: false },
    floor: { type: Number },
    apartment: { type: String },
    notes: { type: String },
    // lat: { type: Number, required: true },
    // lng: { type: Number, required: true },

}
    , {
        _id: false
    }

)

// 1- create schema object
const usersSchema = new mongoose.Schema({
    _id: { type: Number },
    userFullName: {
        type: String,
        required: true
    },
    userPassword: { type: String, required: true },
    userEmail: {
        type: String,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required: true,
        minlength: 10,
        maxlength: 50,
        lowercase: true,
        unique:true
    },

    userPhone: { type: Number, unique: true, required: true, length: 11 },
    userAddress: { type: addressSchema, _id: false, required: false },
    userOrder: [{ type: Number, ref: "orders", required: false, default: [] }],


}

)

//2- mapping
usersSchema.plugin(AutoIncrement, { id: 'userCounter' });
module.exports = mongoose.model("users", usersSchema)


//////////////////////////////