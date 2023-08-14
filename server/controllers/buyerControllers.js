const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Order = require('../models/order');
const Seller = require('../models/seller');

//-------- Register User ---------
//@des      To register a new user
//@route    --
//@access   Public
const registerUser = asyncHandler( async (req,res) => {
    const { name , email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new console.error('Please Enter all the Fields');
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
        if(user) {
            res.send(201).json({
                _id: buyer._id,
                name: buyer.name,
                email: buyer.email
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//-------- Login User ---------
//@des      To Login 
//@route    --
//@access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await Buyer.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});


// ------- Buy Product ---------
//@des      To buy a new Product
//@route    --
//@access   To buyer only
const buyProduct = asyncHandler( async (req,res) => {
    const { productId, buyerId } = req.body;

    // const { productId } = req.body;
    // let buyerId = req.buyer._id;

    try {
        const product = await Product.findById(productId);
        const buyer = await Buyer.findById(buyerId);
        const seller = await Seller.findById(product.seller);
        console.log(`Initial money: Buyer: ${buyer.walletMoney}, Seller: ${seller.walletMoney}`);
       
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

            // ----------- supercoins --------------
            // Calculate supercoins earned by Flipkart (coins_by_flipkart) and by the seller (product.coins)
            const coins_by_flipkart = (2 * Number(product.productPrice)) / 100;

            
            console.log(`${product.productName} ordered by ${buyer.name}`);
            console.log(`Supercoins transferred by Flipkart: ${coins_by_flipkart}`);
            console.log(`Supercoins transferred by ${seller.name}: ${product.coins}`);
            console.log(`Remaining money: Buyer: ${newBuyerMoney}, Seller: ${newSellerMoney}`);

            /* blockchain -> transfer -> orderId + coins ( by flipkart & by seller) */
            res.send(`Order placed: ${product.productName}, Supercoins transferred by Flipkart: ${coins_by_flipkart} & by ${seller.name}: ${product.coins}`);
        } else {
            console.log('Insufficient Money');
            res.status(400).send(`Insufficient Money: ${buyer.walletMoney}, Order value: ${orderValue}`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { registerUser, authUser, buyProduct };