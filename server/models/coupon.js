const mongoose = require('mongoose');

const couponSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        discription: { type: String, required: true, default: "New Coupon" },
        coins: { type: Number , require: true }
    }
  );


const Coupon = mongoose.model("Coupon",couponSchema);

module.exports = Coupon;