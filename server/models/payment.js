const moment = require("moment");
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    point: {
        type: Number,
        default: 0,
        required: true,
    },
    register_date: {
        type: Date,
        default: moment().format("MMMM DD, YYYY"),
        required: true,
    },
    purpose: {
        type: String,
        enum: ["C", "U"],
        required: true,
    },
    etc: {
        type: String,
    },
});

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = { Payment };
