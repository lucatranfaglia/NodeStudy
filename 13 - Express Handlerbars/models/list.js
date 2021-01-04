'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      list.belongsTo(models.User);      
    }
  };
  list.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },  
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
    }
  }, {
    sequelize,
    modelName: 'List',
  });
  return list;
};