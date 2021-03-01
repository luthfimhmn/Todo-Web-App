'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    completeStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate: (todo) => {
        todo.completeStatus = false
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};