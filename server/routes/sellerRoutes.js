const express = require('express');
const {
    registerSeller,
    authSeller,
    addProduct,
    addCoins,
    addMoney,
    loyalCustomers,
    allProducts,
    getSeller,
    allProductsSeller
} = require('../controllers/sellerControllers');
const { protectSeller } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post( registerSeller );
router.route('/login').post( authSeller );
router.route('/addproduct').post( protectSeller, addProduct );
router.route('/addcoins').post( protectSeller, addCoins );
router.route('/addmoney').post( protectSeller, addMoney );
router.route('/loyalcustomers').post( protectSeller, loyalCustomers );
router.route('/allproducts').post( allProductsSeller );
router.route('/allproducts').get( allProducts );
router.route('/getseller').post( getSeller );

module.exports = router;