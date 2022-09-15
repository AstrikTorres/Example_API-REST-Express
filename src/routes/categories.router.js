const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  res.json(categories.slice((offset || 0), (limit || 10)));
});


router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
    name: `Product ${productId}`,
    price: 100
  });
});

module.exports = router;