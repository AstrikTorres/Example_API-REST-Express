const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  res.json(products.slice((offset || 0), (limit || 10)));
});

router.get('/filter', (req, res) => {
  res.json(products.filter((p) => p.name.includes(req.query.content)));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    res.json(product);
  }
  res.status(404).json({ message: 'Product not found' });
});

// POST /products
router.post('/', (req, res) => {
  const { name, price, image, categoryId } = req.body;
  const product = {
    id: products.length + 1,
    name,
    price,
    image,
    categoryId,
  };
  products.push(product);
  res.status(201).json(product);
});

module.exports = router;