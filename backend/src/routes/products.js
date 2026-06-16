const express = require('express');
const router = express.Router();
const { listProducts, getProduct, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, createProduct); // Apenas admin

module.exports = router;
