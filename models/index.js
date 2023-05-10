const Category = require('./Category');
const Meal = require('./Meal');
const MealCategory = require('./MealCategory');
const User = require('./User');

Meal.belongsToMany(Category, { through: MealCategory });
Category.belongsToMany(Meal, { through: MealCategory });

User.hasMany(Meal, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Meal.belongsTo(User, {
    foreignKey: 'user_id'
  });


module.exports = { Category, Meal, MealCategory, User };