const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DB"); 
const { buyProduct } = require("./controllers/buyerControllers");
const path = require("path");
const Product = require("./models/product");
const Order = require("./models/order");
const Buyer = require("./models/buyer");
const Seller = require("./models/seller");
const Coupon = require("./models/coupon");



dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 

// app.use('/api/user/',)
app.get('/',(req,res) => {
    res.send("Shree Ganesh")
});

// ------------------ Auth --------------------

// new buyer
app.get('/buyer/:name/:email/:password', async (req,res) => {
    const { name , email, password } = req.params;

    var newUser = {
        name : name,
        email : email,
        password : password
    }

    console.log(newUser);
    try {
        var user = await Buyer.create(newUser);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// new seller
app.get('/seller/:name/:email/:password', async (req,res) => {
    const { name , email, password } = req.params;

    var newUser = {
        name : name,
        email : email,
        password : password
    }

    console.log(newUser);
    try {
        var user = await Seller.create(newUser);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// new product
app.get('/product/:name/:sellerId', async (req,res) => {
    const { name, sellerId } = req.params;
    try {
        const seller = await Seller.findById(sellerId);
        console.log(seller.name);
        var newProduct = {
            productName : name,
            productPrice : 1000,
            seller : seller
        }
        var product = await Product.create(newProduct);
        console.log(product);
        res.send(`${product.seller}`)
    } catch (error) {
        res.status(400);
        console.log("Error");
        throw new Error(error.message);
    }
});

// new coupon
app.get('/coupon/:name/:coins', async (req,res) => {
    const { name, coins } = req.params;

    var newCoupon = {
        name : name,
        coins : coins,
    }

    console.log(newCoupon);
    try {
        var coupon = await Coupon.create(newCoupon);
        res.send(`${coupon}`)
    } catch (error) {
        res.status(400);
        console.log("Error");
        throw new Error(error.message);
    }
});




//------------------------------- sellers Functions ----------------------- 

// add supercoins -> blockchain remains
app.get('/sellerReqCoins/:sellerId/:reqCoins', async (req, res) => {
    let { sellerId, reqCoins } = req.params;

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


// add money -> temp done
app.get('/sellerReqMoney/:sellerId/:reqMoney', async (req, res) => {
    let { sellerId, reqMoney } = req.params;

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


// loyal Customers -> doneeee
app.get('/loyalCustomers/:seller_id', async (req, res) => {
    const { seller_id } = req.params;
    const customer = {};

    try {
        const orders = await Order.find({});
        
        await Promise.all(orders.map(async (element) => {
            const product = await Product.findById(element.product);

            if (product.seller == seller_id) {
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


//All products of the seller -> to be done
app.get('/allProductsSeller/:seller_id', async (req, res) => {
    const { seller_id } = req.params;
    
    try {
        // Use the Product model to find all products with the specified seller ID
        const products = await Product.find({ 'seller': seller_id });

    } catch (error) {
        // Handle any errors that occurred during the database query
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// ------------------ Buyer Functions -----------------

// new order --> blockchain remains
app.get('/order/:productId/:buyerId', async (req, res) => {
    const { productId, buyerId } = req.params;

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
            buyer.orderArr.push(order._id);
            await buyer.save();
            // ----------- supercoins --------------
            // Calculate supercoins earned by Flipkart (coins_by_flipkart) and by the seller (product.coins)
            const coins_by_flipkart = (2 * Number(product.productPrice)) / 100;
            
            res.send(buyer.orderArr);
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


// add money --> temprery done
app.get('/buyerReqMoney/:buyerId/:reqMoney', async (req, res) => {
    let { buyerId, reqMoney } = req.params;

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

// use coins -> blockchain remain
app.get('/buyerUseCoins/:buyerId/:couponId', async (req,res) => {
    let { buyerId, couponId} = req.params;

    try {
        let buyer = await Buyer.findById(buyerId);
        let coupon = await Coupon.findById(couponId);

        let reqCoins = coupon.coins;

        /* blockchain */
        let userCoins = 50;

        if(userCoins >= reqCoins) {
            /* make a txn in blockchain => user sends reqCoins to flipkart */

            userCoins = userCoins - reqCoins;
            console.log(`coupon: ${coupon.name} awails`);
            console.log(`remain coins: ${userCoins}`);
            res.send(`coupon: ${coupon.name} awails`)
        }
        else {
            console.log("Not Enough Coins");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get('/viewbuyer/:buyerId', async (req,res) => {
    const {buyerId} = req.params;

    try {
        const buyer = await Buyer.findById(buyerId);
        res.send(buyer);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})



const server = app.listen(5000,console.log(`Server is running on 5000`));
