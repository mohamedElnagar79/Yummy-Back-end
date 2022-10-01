const mongoose = require("mongoose");

const pilotSchema = new mongoose.Schema({
    _id: { type: Number, required: true, length: 14 },
    pilotStatus: { type: String, required: true, default: "not avilable", enum: ["avilable", "not avilable"] },
    deliveryDeparture: { type: Date, default: Date.now, required: true },
    deliveryArrival: { type: Date, default: Date.now, required: true },
    pilotName: { type: String, required: true, minlength: 3, maxlength: 50 },
    orders: [{ type: Number, ref: "orders", required: true, default: [] }],
    pilotNumber: { type: Number, required: true, unique: true, length: 11 },
    pilotNotes: { type: String },
    pilotLisenceImage: { type: String, required: true },
    pilotPassword: { type: String, required: true, minlength: 8 }
}
    , {
        _id: false
    }
)
module.exports = mongoose.model("pilots", pilotSchema);
