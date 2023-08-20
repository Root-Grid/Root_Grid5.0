const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const path = require("path");
const buyerRoutes = require("./routes/buyerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

const allowedOrigins = ["http://localhost:3000"];

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// app.use('/api/user/',)

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Shree Ganesh");
});

app.use("/api/user", buyerRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

/*
// ------------------ Auth --------------------

// new buyer
app.get("/buyer/:name/:email/:password", async (req, res) => {
  const { name, email, password } = req.params;

  var newUser = {
    name: name,
    email: email,
    password: password,
  };

  console.log(newUser);
  try {
    var user = await Buyer.create(newUser);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// new seller
app.get("/seller/:name/:email/:password", async (req, res) => {
  const { name, email, password } = req.params;

  var newUser = {
    name: name,
    email: email,
    password: password,
  };

  console.log(newUser);
  try {
    var user = await Seller.create(newUser);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// new product
app.get("/product/:name/:sellerId", async (req, res) => {
  const { name, sellerId } = req.params;
  try {
    const seller = await Seller.findById(sellerId);
    console.log(seller.name);
    var newProduct = {
      productName: name,
      productPrice: 1000,
      seller: seller,
    };
    var product = await Product.create(newProduct);
    console.log(product);
    res.send(`${product.seller}`);
  } catch (error) {
    res.status(400);
    console.log("Error");
    throw new Error(error.message);
  }
});
// new coupon
app.get("/coupon/:name/:coins", async (req, res) => {
  const { name, coins } = req.params;

  var newCoupon = {
    name: name,
    coins: coins,
  };

  console.log(newCoupon);
  try {
    var coupon = await Coupon.create(newCoupon);
    res.send(`${coupon}`);
  } catch (error) {
    res.status(400);
    console.log("Error");
    throw new Error(error.message);
  }
});

//------------------------------- sellers Functions -----------------------

// add supercoins -> blockchain remains
app.get("/sellerReqCoins/:sellerId/:reqCoins", async (req, res) => {
  let { sellerId, reqCoins } = req.params;

  try {
    let seller = await Seller.findById(sellerId);

    let money = seller.walletMoney;
    let supercoinValue = 2;

    if (money >= reqCoins * supercoinValue) {
      let newMoney = money - reqCoins * supercoinValue;

      await Seller.findOneAndUpdate(
        { _id: sellerId },
        { walletMoney: newMoney }
      );

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
app.get("/sellerReqMoney/:sellerId/:reqMoney", async (req, res) => {
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
app.get("/loyalCustomers/:seller_id", async (req, res) => {
  const { seller_id } = req.params;
  const customer = {};

  try {
    const orders = await Order.find({});

    await Promise.all(
      orders.map(async (element) => {
        const product = await Product.findById(element.product);

        if (product.seller == seller_id) {
          const user = element.buyer;

          if (customer.hasOwnProperty(user)) {
            customer[user] += product.productPrice;
          } else {
            customer[user] = product.productPrice;
          }
        }
      })
    );

    // Convert the customer object to an array of objects
    const customerArray = Object.entries(customer).map(([user, loyalty]) => ({
      user,
      loyalty,
    }));

    // Sort the customer array by loyalty points in descending order
    customerArray.sort((a, b) => b.loyalty - a.loyalty);

    console.log(customerArray);
    res.send(customerArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//All products of the seller -> to be done
app.get("/allProductsSeller/:seller_id", async (req, res) => {
  const { seller_id } = req.params;

  try {
    // Use the Product model to find all products with the specified seller ID
    const products = await Product.find({ seller: seller_id });
  } catch (error) {
    // Handle any errors that occurred during the database query
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
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
            const newBuyerMoney = Number(buyer.walletMoney) - Number(orderValue);
            await Buyer.findByIdAndUpdate(buyerId, { walletMoney: newBuyerMoney });

            const newSellerMoney = Number(seller.walletMoney) + Number(orderValue);
            await Seller.findByIdAndUpdate(product.seller, { walletMoney: newSellerMoney });

            const newOrder = {
                buyer: buyer._id,
                product: product._id,
                status: 'Indeterminent',
            };
            const order = await Order.create(newOrder);
            buyer.orderArr.push(order._id);
            await buyer.save();
            startStatusUpdateTimer(order._id, product.coins, buyer, seller, product);

            const coins_by_flipkart = (2 * Number(product.productPrice)) / 100;

            res.send(`Order placed: ${product.productName} with orderId: ${order._id}, Supercoins transferred by Flipkart: ${coins_by_flipkart} & by ${seller.name}: ${product.coins}`);
        } else {
            console.log('Insufficient Money');
            res.status(400).send(`Insufficient Money: ${buyer.walletMoney}, Order value: ${orderValue}`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
  
});

async function startStatusUpdateTimer(orderId, productCoins, buyer, seller, product) {
    const delay = 50000;
    const orderValue = product.productPrice;
    setTimeout(async () => {
        const order = await Order.findById(orderId);

        if (order && order.status === 'Returned') {
            console.log(`Order with ID ${orderId} has already been returned.`);
        } else {
            await Order.findByIdAndUpdate(orderId, { status: 'orderPlaced' });
            console.log(`Order status updated to 'orderPlaced' for order ID: ${orderId}`);
        }
    }, delay);
}

app.get('/return/:orderId', async (req, res) => {
    const { orderId } = req.params;
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

        console.log(`Money reversed: Buyer: ${newBuyerMoney}, Seller: ${newSellerMoney}`);

        res.send(`Order with ID ${orderId} has been returned and money reversed.`);
    } else {
        res.status(400).send(`Invalid return request.`);
    }
});



// add money --> temprery done
app.get("/buyerReqMoney/:buyerId/:reqMoney", async (req, res) => {
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
app.get("/buyerUseCoins/:buyerId/:couponId", async (req, res) => {
  let { buyerId, couponId } = req.params;

  try {
    let buyer = await Buyer.findById(buyerId);
    let coupon = await Coupon.findById(couponId);

    let reqCoins = coupon.coins;

    // ***********blockchain*******
    let userCoins = 50;

    if (userCoins >= reqCoins) {
      // ********* make a txn in blockchain => user sends reqCoins to flipkart *********

      userCoins = userCoins - reqCoins;
      console.log(`coupon: ${coupon.name} awails`);
      console.log(`remain coins: ${userCoins}`);
      res.send(`coupon: ${coupon.name} awails`);
    } else {
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

*/

const port = 5000;
const server = app.listen(port, console.log(`Server is running on ${port}`));
