'use strict';
const {
  Model, DATEONLY
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
      Todo.belongsTo(models.User, { foreignKey: "UserId" })
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
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          args: true,
          msg: 'Must input in Date format'
        },
        isAfter: {
          args: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
          msg: 'Due date must More than this date'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (todo) => {
        todo.status = false
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};