/*
product_name
product_discription
product_image
product_price
seller_id
*/


const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        productName: { type: String, required: true },
        productImage: {
            type: "String",
            required: true,
            default:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
        },
        productDiscription: { type: String, required: true, default: "New Product" },
        productPrice: { type: Number , require: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
        coins: {type: Number, require: true, default: 0}
    }
  );


const Product = mongoose.model("Product",productSchema);

module.exports = Product;