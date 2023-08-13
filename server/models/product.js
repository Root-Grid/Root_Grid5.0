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
            "",
        },
        productDiscription: { type: String, required: true, default: "New Product" },
        productPrice: { type: Number , require: true },
        seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }]
      
    }
  );


const Product = mongoose.model("Product",productSchema);

module.exports = Product;