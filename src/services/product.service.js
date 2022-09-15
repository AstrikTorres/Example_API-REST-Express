const { products } = require('../db/init.db');

class ProductsService {
  constructor() {
    this.products = products;
  }

  getProducts(offset, limit) {
    return this.products.slice(offset, limit);
  }

  getProduct(id) {
    return this.products.find(product => product.id === id);
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
    if (index >= 0) {
      const productUpdated = {
        ...this.products[index],
        ...product,
      };
      this.products[index] = productUpdated;
      return productUpdated;
    }
    return null;
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