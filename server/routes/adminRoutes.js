const express = require('express');

const { addcoupon, getcoupons, changeOrderStatus } = require('../controllers/adminControllers');

const router = express.Router();

router.route('/addcoupon').post( addcoupon );
router.route('/getcoupons').get( getcoupons );
router.route('/change-order-status').post( changeOrderStatus );

module.exports = router;