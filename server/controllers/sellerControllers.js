const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');
const Seller = require('../models/seller');

// ------- Buy Product ---------
//@des      To buy a new Product
//@route    --
//@access   To buyer only
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