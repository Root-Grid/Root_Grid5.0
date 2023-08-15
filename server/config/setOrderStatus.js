const Buyer = require("../models/buyer");
const Order = require("../models/order");
const Product = require("../models/product");
const Seller = require("../models/seller");

async function startStatusUpdateTimer( orderId ) {
    const delay = 50000;

    setTimeout(async () => {
        const order = await Order.findById(orderId);
        const product = await Product.findById(order.product);
        const seller = await Seller.findById(product.seller);
        const buyer = Buyer.findById(order.buyer);

        if (order && order.status === 'Returned') {
            console.log(`Order with ID ${orderId} has already been returned.`);

        } else {
            await Order.findByIdAndUpdate(orderId, { status: 'orderPlaced' });
            console.log(`Order status updated to 'orderPlaced' for order ID: ${orderId}`);

            /* ----------- super coin update -------------- */
            const coins_by_flipkart = (2 * Number(product.productPrice)) / 100;
            console.log(`Supercoins transferred by Flipkart: ${coins_by_flipkart} -->`);
            console.log(`Supercoins transferred by ${seller.name}: ${product.coins} -->`);
            console.log(`--> ${buyer.name}`);
        }
    }, delay);
};

module.exports = { startStatusUpdateTimer };