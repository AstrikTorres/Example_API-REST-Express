const express = require('express');

const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const { offset, limit } = req.query;
  res.json(
    service.getProducts(offset || 0, limit || 10)
  );
});

router.get('/filter', (req, res) => {
  const { query } = req.query;
  const products = service.searchProducts(query);
  if (products && products.length > 0) {
    res.json(products);
  }

  res.status(404).json({
    message: 'Not found',
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.getProduct(parseInt(id));
  if (product != null) {
    res.json(product);
  }

  res.status(404).json({ message: 'Product not found' });
});

router.post('/', (req, res) => {
  res.status(201).json(service.createProduct(req.body));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.updateProduct(parseInt(id), body);
  if ((body.name, body.price, body.image, body.categoryId) == null) {
    res.status(400).json({
      message: 'Name, price, image and categoryId are required'
    });
  }
  if (product != null) {
    res.json(product);
  }

  res.status(404).json({ message: 'Product not found' });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.updateProduct(parseInt(id), body);
  if (product != null) {
    res.json(product);
  }

  res.status(404).json({ message: 'Product not found' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const isDeleted = service.deleteProduct(parseInt(id));
  if (isDeleted) {
    res.status(200).json({
      message: 'Product deleted'
    });
  }

  res.status(404).json({ message: 'Product not found' });
});

module.exports = router;