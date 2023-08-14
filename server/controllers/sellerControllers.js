const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');
const Seller = require('../models/seller');


//-------- Register Seller ---------
//@des      To register a new Seller
//@route    --
//@access   Public
const registerSeller = asyncHandler( async (req,res) => {
    const { name , email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new console.error('Please Enter all the Fields');
    }

    const sellerExists = await Seller.findOne({ email });

    if ( sellerExists ) {
        res.status(400);
        throw new Error("Seller already exists");
    }

    var newSeller = {
        name : name,
        email : email,
        password : password
    }

    try {
        var seller = await Seller.create( newSeller );
        if( seller ) {
            res.send(201).json({
                _id: seller._id,
                name: seller.name,
                email: seller.email
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//-------- Login Seller ---------
//@des      To Login 
//@route    --
//@access   Public
const authSeller = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const seller = await Seller.findOne({ email });
    
    if (seller && (await seller.matchPassword(password))) {
        res.json({
            _id: seller._id,
            name: seller.name,
            email: seller.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

//-------- Add Product ---------
//@des      To Add Product 
//@route    --
//@access   Public
const addProduct = asyncHandler( async (req, res) => {

    // const { name, sellerId } = req.body;

    const { name, image, discription, price, coins} = req.body;
    const sellerId = req.seller._id;

    try {
        const seller = await Seller.findById(sellerId);
        console.log(seller.name);
        var newProduct = {
            productName : name,
            productImage : image,
            productDiscription : discription,
            productPrice : price,
            seller : seller,
            coins : coins
        }
        var product = await Product.create(newProduct);
        if( product ) {
            res.send(201).json({
                _id: product._id,
                name: product.name,
                picture: product.productImage,
                price: product.productPrice,
                discription: product.productDiscription,
                coins: product.coins,
                seller: product.seller
            });
        }
    } catch (error) {
        res.status(400);
        console.log("Error");
        throw new Error(error.message);
    }
});

// ------- Add Coins ---------
//@des      To add supercoins in sellers account
//@route    --
//@access   To seller only
const addCoins = asyncHandler( async ( req, res ) => {

    // let { sellerId, reqCoins } = req.body;

    let { reqCoins } = req.body;
    let sellerId = req.seller._id;

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

    // let { sellerId, reqMoney } = req.body;

    let { reqMoney } = req.body;
    let sellerId = req.seller._id;

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
    // const { sellerId } = req.body;

    const sellerId = req.seller._id;

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
    // const { sellerId } = req.body;

    const sellerId = req.seller._id;
    
    try {
        const products = await Product.find({ 'seller': sellerId });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { registerSeller, authSeller, addProduct, addCoins, addMoney, loyalCustomers, allProducts };