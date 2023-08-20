const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');
const Seller = require('../models/seller');
const Coupon = require('../models/coupon');
const { setOrderStatus } = require('../config/setOrderStatus');
const generateToken = require('../config/generateToken');
const { response } = require('express');
const CouponOrder = require('../models/couponOrders');

//-------- Register User ---------
//@des      To register a new user
//@route    POST /api/user/
//@access   Public
const registerUser = asyncHandler( async (req,res) => {
    const { name , email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please Enter all the Fields');
    }

    const userExists = await Buyer.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    var newUser = {
        name : name,
        email : email,
        password : password
    }

    try {
        var buyer = await Buyer.create(newUser);
        if(buyer) {
            res.json({
                _id: buyer._id,
                name: buyer.name,
                email: buyer.email,
                token: generateToken(buyer._id)
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//-------- Login User ---------
//@des      To Login 
//@route    POST /api/user/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
    // console.log("into the func");
    const { email, password } = req.body;
    
    const user = await Buyer.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

// ------- Single Product ---------
//@des      To view single product
//@route    GET /api/user?productId=
//@access   To buyer only
const singleProduct = asyncHandler( async (req,res) => {
    const productId = req.query.productId;
    const product = await Product.findById(productId);

    if(product) {
        res.json(product);
        // console.log(product);
    }
    else {
        res.status(400);
        throw new Error("Product not found");
    }
});

// ------- Buy Product ---------
//@des      To buy a new Product
//@route    POST /api/user/buyproduct
//@access   To buyer only
const buyProduct = asyncHandler( async (req,res) => {
    const { productId, buyerId } = req.body;

    // const { productId } = req.body;
    // let buyerId = req.buyer._id;

    try {
        const product = await Product.findById(productId);
        const buyer = await Buyer.findById(buyerId);
        const seller = await Seller.findById(product.seller);
        // console.log(`Initial money: Buyer: ${buyer.walletMoney}, Seller: ${seller.walletMoney}`);
       
        const orderValue = product.productPrice;

        if (buyer.walletMoney >= orderValue) {

            const newBuyerMoney = buyer.walletMoney - orderValue;
            await Buyer.findByIdAndUpdate(buyerId, { walletMoney: newBuyerMoney });

            
            const newSellerMoney = seller.walletMoney + orderValue;
            await Seller.findByIdAndUpdate(product.seller, { walletMoney: newSellerMoney });

            
            const newOrder = {
                buyer: buyer._id,
                product: product._id,
            };
            const order = await Order.create(newOrder);
            // buyer.orderArr.push(order);
            // await buyer.save();

            // console.log(`${product.productName} ordered by ${buyer.name}`);
            // console.log(`Remaining money: Buyer: ${newBuyerMoney}, Seller: ${newSellerMoney}`);

            // ----------- supercoins -> in ../config/setOrderStatus --------------
            // Calculate supercoins earned by Flipkart (coins_by_flipkart) and by the seller (product.coins)
            // const coins_by_flipkart = (2 * Number(product.productPrice)) / 100;

            // console.log(`Supercoins transferred by Flipkart: ${coins_by_flipkart}`);
            // console.log(`Supercoins transferred by ${seller.name}: ${product.coins}`);

            /* blockchain -> transfer -> orderId + coins ( by flipkart & by seller) */
            // res.send(`Order placed: ${product.productName}, Supercoins transferred by Flipkart: ${coins_by_flipkart} & by ${seller.name}: ${product.coins}`);
            
            if(order) {
                setOrderStatus(order._id); // return function
                res.json({
                    _id: order._id,
                    buyer: order.buyer,
                    product: order.product,
                    status: order.status
                });
            }

        } else {
            console.log('Insufficient Money');
            res.status(400).send(`Insufficient Money: ${buyer.walletMoney}, Order value: ${orderValue}`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// ------- Check Order ---------
//@des      To buy a new Product
//@route    POST /api/user/checkorder
//@access   To buyer only
const checkOrder = asyncHandler(async(req,res) => {
    const {orderId} = req.body;
    
    try{
        const order = Order.findById(orderId);
        res.json({
            status:order.status
        })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ------- Add Money ---------
//@des      To Add Money
//@route    POST /api/user/addmoney
//@access   To buyer only
const addMoney = asyncHandler( async (req, res) => {
    let { buyerId, reqMoney } = req.body;
    // const { reqMoney } = req.body;
    // const buyerId = req.buyer._id;

    try {
        let buyer = await Buyer.findById(buyerId);
        let newMoney = Number(buyer.walletMoney) + Number(reqMoney);
        await Buyer.findOneAndUpdate({ _id: buyerId }, { walletMoney: newMoney });

        // Perform actions related to supercoin transfer to another system (e.g., Flipkart)
        // Note: This part of the code is commented out and should be implemented as needed.

        console.log(`New money: ${newMoney}`);
        res.send(`New money: ${newMoney}, Money Added: ${reqMoney}`);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ------- Use Coins ---------
//@des      To Use Coins / Blockchain
//@route    POST /api/user/buycoupons
//@access   To buyer only
const buyCoupons = asyncHandler( async (req,res) => {
    let { buyerId, couponId} = req.body;

    try {
        let buyer = await Buyer.findById(buyerId);
        let coupon = await Coupon.findById(couponId);

        let reqCoins = coupon.coins;

        /* blockchain */
        let userCoins = 50;

        if(userCoins >= reqCoins) {
            /* make a txn in blockchain => user sends reqCoins to flipkart */

            userCoins = userCoins - reqCoins;
            
            const newOrder = {
                buyer: buyer._id,
                coupon: coupon._id,
            };
            const order = await CouponOrder.create(newOrder);
            if(order) {
                res.json({
                    orderId: order._id,
                    couponName: coupon.name
                });
            }
        }
        else {
            console.log("Not Enough Coins");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ------- Return Function ---------
//@des      To return the product
//@route    POST /api/user/returnproduct
//@access   To buyer only
const returnProduct = asyncHandler( async (req, res) => {
    // console.log("insode the func");
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    const product = await Product.findById(order.product);

    if (order && order.status === 'Indeterminent') {
        await Order.findByIdAndUpdate(orderId, { status: 'Returned' });

        const buyer = await Buyer.findById(order.buyer);
        const seller = await Seller.findById(product.seller);

        const orderValue = product.productPrice;
        const newBuyerMoney = Number(buyer.walletMoney) + Number(orderValue);
        const newSellerMoney = Number(seller.walletMoney) - Number(orderValue);

        await Buyer.findByIdAndUpdate(buyer._id, { walletMoney: newBuyerMoney });
        await Seller.findByIdAndUpdate(seller._id, { walletMoney: newSellerMoney });

        console.log(`product returned--> Money reversed: Buyer: ${newBuyerMoney}, Seller: ${newSellerMoney}`);
       
      
        res.send(201);
    } else {
        res.status(400).send(`Invalid return request.`);
    }
});


// ------- All Orders ---------
//@des      To return all the order history
//@route    POST /api/user/allorders
//@access   To buyer only
const allOrders = asyncHandler(async (req, res) => {
  const { buyerId } = req.body;

  try {
    const orders = await Order.find({ buyer: buyerId }).populate('product'); // Populate the 'product' field to get product details.
    res.json(orders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

  
module.exports = { registerUser, authUser, buyProduct, checkOrder, addMoney, buyCoupons, returnProduct, singleProduct, allOrders};