const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;

products = [];
categories = [];
for (let i = 1; i < 100; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    categoryId: faker.random.number({ min: 1, max: 10 }),
  });
}
for (let i = 1; i < 10; i++) {
  categories.push({
    id: i,
    name: faker.commerce.department(),
    products: products.filter((p) => p.categoryId === i),
  });
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/products', (req, res) => {
  const { limit, offset } = req.query;
  res.json(products.slice((offset || 0), (limit || 10)));
});

app.get('/products/filter', (req, res) => {
  res.json(products.filter((p) => p.name.includes(req.query.content)));
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  const product = products.find((p) => p.id === parseInt(id));
  if (product) {
    res.json(product);
  }
  res.status(404).json({ message: 'Product not found' });
});



app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
    name: `Product ${productId}`,
    price: 100
  });
});

// Query Parameters
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.json({
      message: 'No limit or offset'
    });
  }
});

app.listen(port, () => {
  console.log(`My port ${port}`);
});
