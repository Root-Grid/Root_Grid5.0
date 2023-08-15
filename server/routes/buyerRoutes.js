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

const router = express.Router();

router.route('/').post( registerUser ).get( singleProduct );
router.route('/login').post( authUser );
router.route('/buyproduct').post( buyProduct );
router.route('/addmoney').post( addMoney );
router.route('/buycoupons').post( buyCoupons );
router.route('/returnproduct').post( returnProduct );

module.exports = router;