const express = require('express');
const routerApi = require('./routes/index');
const generateData = require('./db/init.db');

const app = express();
const port = 3000;

const { products, categories } = generateData(100, 10);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`My port ${port}`);
});

routerApi(app);