const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meal extends Model {}

Meal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prep_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cook_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instructions: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        protein: {
            type: DataTypes.INTEGER,
        },
        fat: {
            type: DataTypes.INTEGER,
        },
        carbs: {
            type: DataTypes.INTEGER,
        },
        sugar: {
            type: DataTypes.INTEGER,
        },
        calories: {
            type: DataTypes.INTEGER,
        },
        filename: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'meal'

    }
)

module.exports = Meal;