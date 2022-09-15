const faker = require('faker');

products = [];
categories = [];

for (let i = 1; i < 100+1; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    categoryId: faker.random.number({ min: 1, max: 10 }),
  });
}
for (let i = 1; i < 10+1; i++) {
  categories.push({
    id: i,
    name: faker.commerce.department(),
    products: products.filter((p) => p.categoryId === i),
  });
}

module.exports = {
  products,
  categories,
};