const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');
const Seller = require('../models/seller');

// ------- Add Coins ---------
//@des      To add supercoins in sellers account
//@route    --
//@access   To seller only
const addCoins = asyncHandler( async ( req, res ) => {

    let { sellerId, reqCoins } = req.body;

    // let { reqCoins } = req.body;
    // let sellerId = req.seller._id;
    try {
        let seller = await Seller.findById(sellerId);

        let money = seller.walletMoney;
        let supercoinValue = 2;


        if (money >= reqCoins * supercoinValue) {
            let newMoney = money - reqCoins * supercoinValue;

            await Seller.findOneAndUpdate({ _id: sellerId }, { walletMoney: newMoney });

            // Perform actions related to supercoin transfer to another system (e.g., Flipkart)
            // Note: This part of the code is commented out and should be implemented as needed.

            console.log(`${reqCoins} supercoins transferred into your account`);
            console.log(`Remaining money: ${newMoney}`);

            res.send(`Remaining money: ${newMoney}`);
        } else {
            console.log("Money Not Sufficient");
            res.status(400).send("Money Not Sufficient");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ------- Add Money ---------
//@des      To add money in sellers account
//@route    --
//@access   To seller only
const addMoney = asyncHandler( async ( req, res ) => {

    let { sellerId, reqMoney } = req.body;

    // let { reqMoney } = req.body;
    // let sellerId = req.seller._id;

    try {
        let seller = await Seller.findById(sellerId);
        
        let newMoney = Number(seller.walletMoney) + Number(reqMoney);

        await Seller.findOneAndUpdate({ _id: sellerId }, { walletMoney: newMoney });

        // Perform actions related to supercoin transfer to another system (e.g., Flipkart)
        // Note: This part of the code is commented out and should be implemented as needed.

        console.log(`New money: ${newMoney}`);

        res.send(`New money: ${newMoney}, Money Added: ${reqMoney}`);
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// ------- Loyel customers ---------
//@des      All loyal Customers
//@route    --
//@access   To seller only
const loyalCustomers = asyncHandler( async (req, res) => {
    const { sellerId } = req.params;

    // const sellerId = req.seller._id;

    const customer = {};

    try {
        const orders = await Order.find({});
        
        await Promise.all(orders.map(async (element) => {
            const product = await Product.findById(element.product);

            if (product.seller == sellerId) {
                const user = element.buyer;

                if (customer.hasOwnProperty(user)) {
                    customer[user] += product.productPrice;
                } else {
                    customer[user] = product.productPrice;
                }
            }
        }));

        // Convert the customer object to an array of objects
        const customerArray = Object.entries(customer).map(([user, loyalty]) => ({ user, loyalty }));

        // Sort the customer array by loyalty points in descending order
        customerArray.sort((a, b) => b.loyalty - a.loyalty);

        console.log(customerArray);
        res.send(customerArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// ------- All Products ---------
//@des      All Products
//@route    --
//@access   To seller only
const allProducts = asyncHandler( async (req, res) => {
    const { sellerId } = req.params;

    // const sellerId = req.seller._id;
    
    try {
        const products = await Product.find({ 'seller': sellerId });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});