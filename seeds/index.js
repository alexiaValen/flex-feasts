const sequelize = require('../config/connection');
const seedCategory = require('./categoryData');
const seedMeals = require('./mealsData');

const { Category, Meal, User } = require('../models');

const userData = require('./userData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(seedCategory, {
    individualHooks: true,
    returning: true,
  });

  const meals = await Meal.bulkCreate(seedMeals, {
    individualHooks: true,
    returning: true,
  });




  process.exit(0);
};

seedAll();

