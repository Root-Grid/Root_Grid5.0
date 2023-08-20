const express = require('express');

const { addcoupon, getcoupons } = require('../controllers/adminControllers');

const router = express.Router();

router.route('/addcoupon').post( addcoupon );
router.route('/getcoupons').get( getcoupons );

module.exports = router;