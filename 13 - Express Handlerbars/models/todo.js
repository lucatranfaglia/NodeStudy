'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  todo.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },  
    todo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      index: true,
      references:{
        model: 'Lists',
        key: 'id'
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return todo;
};