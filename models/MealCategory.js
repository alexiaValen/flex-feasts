const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MealCategory extends Model {}

MealCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    meal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
        onDelete: 'CASCADE'
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
        onDelete: 'CASCADE'
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal_category',
  }
);

module.exports = MealCategory;