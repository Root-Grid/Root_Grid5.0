/*

Buyer
Seller
Products
Ordervalue
TimeStamp

*/

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        buyer : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Buyer",
        },
        // seller : {
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref : "Seller",
        // },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
        },
        status: {
            type: String,
            enum: ["orderPlaced", "Returned", "Indeterminent", "Completed"],
            default: "Indeterminent", 
        },
        // ordervalue : {
        //     type : Number
        // }
    },
    {
        timestamps : true,
    },
);

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;