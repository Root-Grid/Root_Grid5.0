const express = require('express');
const {
    buyProduct,
    registerUser,
    authUser,
    addMoney,
    buyCoupons,
    returnProduct,
    singleProduct
} = require('../controllers/buyerControllers');
const { protectBuyer } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post( registerUser ).get( singleProduct );
router.route('/login').post( authUser );
router.route('/buyproduct').post( protectBuyer, buyProduct );
router.route('/addmoney').post( protectBuyer, addMoney );
router.route('/buycoupons').post( protectBuyer, buyCoupons );
router.route('/returnproduct').post( protectBuyer, returnProduct );

module.exports = router;