'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey: 'UserID' })
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a title'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a title'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a category (backlog/ todo/ doing/ done)'
      },
      validate: {
        isIn: {
          args: [['backlog', 'todo', 'doing', 'done']],
          msg: 'Please enter a category (backlog/ todo/ doing/ done)'
        }
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter a user ID'
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};