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

module.exports = router;