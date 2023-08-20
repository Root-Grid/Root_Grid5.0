const asyncHandler = require('express-async-handler');
const Coupon = require('../models/coupon');
const Order = require('../models/order');

//-------- Add Product ---------
//@des      To Add Product 
//@route    post /api/admin/addcoupon
//@access   Public
const addcoupon = asyncHandler( async (req, res) => {


    const { name, discription, coins } = req.body;

    try {
        var newCoupon = {
            name,
            discription,
            coins
        }
        var coupon = await Coupon.create(newCoupon);
        if( coupon ) {
            res.send(201);
        }
    } catch (error) {
        res.status(400);
        console.log("Error");
        throw new Error(error.message);
    }
});

//-------- Add Product ---------
//@des      To Add Product 
//@route    get /api/admin/getcoupons
//@access   Public
const getcoupons = asyncHandler( async (req, res) => {

    try {
        const coupons = await Coupon.find({});
        // console.log(products);
        res.json(coupons);
        // res.send(JSON.stringify(products));
        // res.json("hello")
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//-------- Change Order Status ---------
//@des      To Add Product 
//@route    post /api/admin/change-order-status
//@access   Public
const changeOrderStatus = asyncHandler(async (req,res)=>{
    const { _orderId } = req.body;

    try{
        const order = await Order.findById(_orderId);
        // console.log(order.status);
        order.status = "Completed";
        // console.log(order);
        await order.save();
        res.send(201);
    } catch(error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// const findCoins = asyncHandler(async ())

module.exports = {addcoupon, getcoupons, changeOrderStatus}