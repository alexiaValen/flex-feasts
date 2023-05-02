const sequelize = require('../config/connection');
const seedCategory = require('./categoryData');
const seedMeals = require('./mealsData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedMeals();

  process.exit(0);
};

seedAll();
