const Category = require('./Category');
const Meal = require('./Meal');
const MealCategory = require('./MealCategory');

Meal.belongsToMany(Category, { through: MealCategory });
Category.belongsToMany(Meal, { through: MealCategory });


module.exports = { Category, Meal, MealCategory };