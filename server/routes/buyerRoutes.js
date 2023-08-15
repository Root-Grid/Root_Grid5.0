/* 
Register
Login
BuyProduct

*/


const express = require('express');
const { buyProduct, registerUser, authUser, addMoney, buyCoupons, returnProduct } = require('../controllers/buyerControllers');
// const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post( registerUser ).get( singleProduct );
router.route('/login').post( authUser );
router.route('/buyproduct').post( buyProduct );
router.route('/addmoney').post( addMoney );
router.route('/buycoupons').post( buyCoupons );
router.route('/returnproduct').post( returnProduct );

module.exports = router;