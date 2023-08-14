const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');

// ------- Buy Product ---------
//@des      To buy a new Product
//@route    --
//@access   To buyer only
const buyProduct = asyncHandler( async (req,res) => {
    const { product } = req.body;

    if(!product) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newOrder = {
        buyer : req.user,
        // seller : product.seller,
        product : product
    };

    try {
        var order = await Order.create(newOrder);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { buyProduct };