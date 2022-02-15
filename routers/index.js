const express = require( 'express');
const productsRoutes = require('./products.routes');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use('/productos', productsRoutes);

module.exports = router;