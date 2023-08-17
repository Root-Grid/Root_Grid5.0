const express = require('express');
const {
    registerSeller,
    authSeller,
    addProduct,
    addCoins,
    addMoney,
    loyalCustomers,
    allProducts,
    getSeller
} = require('../controllers/sellerControllers');

const router = express.Router();

router.route('/').post( registerSeller );
router.route('/login').post( authSeller );
router.route('/addproduct').post( addProduct );
router.route('/addcoins').post( addCoins );
router.route('/addmoney').post( addMoney );
router.route('/loyalcustomers').post( loyalCustomers );
router.route('/allproducts').post( allProducts );
router.route('/getseller').post( getSeller );

module.exports = router;