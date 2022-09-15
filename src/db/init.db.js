const faker = require('faker');

products = [];
categories = [];

const generateData = (limitProducts, limitCategories) => {
  for (let i = 1; i < limitProducts+1; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image(),
      categoryId: faker.random.number({ min: 1, max: 10 }),
    });
  }
  for (let i = 1; i < limitCategories+1; i++) {
    categories.push({
      id: i,
      name: faker.commerce.department(),
      products: products.filter((p) => p.categoryId === i),
    });
  }
  return { products, categories };
};

module.exports = generateData;