const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        buyer : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Buyer",
        },
        coupon : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Coupon",
        }
    },
    {
        timestamps : true,
    },
);

const CouponOrder = mongoose.model("CouponOrder",orderSchema);

module.exports = CouponOrder;