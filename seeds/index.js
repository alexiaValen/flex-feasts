const sequelize = require('../config/connection');
const seedCategory = require('./categoryData');
const seedMeals = require('./mealsData');

const { Category, Meal } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const meals = await Meal.bulkCreate(seedMeals, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(seedCategory, {
    individualHooks: true,
    returning: true,
  });


  await seedCategory();

  await seedMeals();



  process.exit(0);
};

seedAll();

