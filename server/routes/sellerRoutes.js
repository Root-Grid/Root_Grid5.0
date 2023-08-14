const express = require('express');
const Seller = require('../models/seller');
const Product = require('../models/product');

const router = express.Router();

router.route('/add-product').post(async (req,res) => {
    const { name, discription, pic, price, coin, sellerId } = res.body;

    try {
        const seller = await Seller.findById(sellerId);
        // console.log(seller.name);
        var newProduct = {
            productName : name,
            productImage: pic,
            productPrice : price,
            productDiscription:discription,
            seller : seller
        }
        var product = await Product.create(newProduct);
        console.log(product);
        res.status(200).json({message: 'Product Added succsesfully'});
    } catch (error) {
        res.status(400);
        console.log("Error");
        throw new Error(error.message);
    }
});