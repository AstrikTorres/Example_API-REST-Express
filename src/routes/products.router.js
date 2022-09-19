const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

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

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
  try {
    const { id } = req.params;
    const product = service.getProduct(parseInt(id));
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res) => {
    res.status(201).json(service.createProduct(req.body));
  }
);

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(createProductSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.updateProduct(parseInt(id), body);
    if (product != null) {
      res.json(product);
    }

    res.status(404).json({ message: 'Product not found' });
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.updateProduct(parseInt(id), body);
    if (product != null) {
      res.json(product);
    }

    res.status(404).json({ message: 'Product not found' });
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    const { id } = req.params;
    try {
      const isDeleted = service.deleteProduct(parseInt(id));
      if (isDeleted) {
        res.status(200).json({
          message: 'Product deleted'
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;