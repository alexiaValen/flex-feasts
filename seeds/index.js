const sequelize = require('../config/connection');
const seedCategory = require('./categoryData');
const seedMeals = require('./mealsData');

const { User } = require('../models');

const userData = require('./userData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedMeals();

  await userData();

  process.exit(0);
};

seedAll();
