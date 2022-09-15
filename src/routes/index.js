const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

const routerApi = (app) => {
  const router = express.Router();
  const apiVersion = '/api/v1';
  app.use(apiVersion, router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;