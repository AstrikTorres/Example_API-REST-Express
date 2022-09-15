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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = products.find((p) => p.id === parseInt(id));
  if ((body.name, body.price, body.image, body.categoryId) == null) {
    res.status(400).json({ message: 'Name, price, image and categoryId are required' });
  }
  if (product) {
    const index = products.indexOf(product);
    const newProduct = {
      ...product,
      ...body,
    };
    products[index] = newProduct;
    res.json(newProduct);
  }
  res.status(404).json({ message: 'Product not found' });
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    const index = products.indexOf(product);
    const productUpdated = {
      ...product,
      ...body,
    };
    products[index] = productUpdated;
    res.json(productUpdated);
  }
  res.status(404).json({ message: 'Product not found' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    products = products.filter((p) => p.id !== parseInt(id));
    res.json({
      message: 'Product deleted',
      product
    });
  }
  res.status(404).json({ message: 'Product not found' });
});

module.exports = router;