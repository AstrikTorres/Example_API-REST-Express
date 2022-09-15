const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/products', (req, res) => {
  res.json({
    name: 'Product 1',
    price: 100
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: `Product ${id}` ,
    price: 100
  });
});

app.get('/api/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
    name: `Product ${productId}`,
    price: 100
  });
});

app.listen(port, () => {
  console.log(`My port ${port}`);
});
