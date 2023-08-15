const express = require('express');
const {
    registerSeller,
    authSeller,
    addProduct,
    addCoins,
    addMoney,
    loyalCustomers,
    allProducts
} = require('../controllers/sellerControllers');

const router = express.Router();

router.route('/').post( registerSeller );
router.route('/login').post( authSeller );
router.route('/addproduct').post( addProduct );
router.route('/addcoins').post( addCoins );
router.route('/addmoney').post( addMoney );
router.route('/loyalcustomers').get( loyalCustomers );
router.route('/allproducts').get( allProducts );

module.exports = router;