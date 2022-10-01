const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 60
    },
    type: {
        type: String,
        required: true,
        enum: ['user', "pilot", "kitchen"],
        default: 'user'
    },
})

loginSchema.plugin(AutoIncrement, { id: "loginCounter" });
module.exports = mongoose.model("login", loginSchema)

