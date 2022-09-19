const { products } = require('../db/init.db');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = products;
  }

  getProducts(offset, limit) {
    return this.products.slice(offset, limit).filter(p => !p.isBlocked);
  }

  getProduct(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  searchProducts(query) {
    return products.filter((p) => p.name.includes(query));
  }

  createProduct(product) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, product) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const productUpdated = {
      ...this.products[index],
      ...product,
    };
    this.products[index] = productUpdated;
    return productUpdated;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index >= 0) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = ProductsService;