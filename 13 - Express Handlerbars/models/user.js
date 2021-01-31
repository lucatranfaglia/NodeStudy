'use strict';

const bc = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here  
      user.hasMany(models.List)
    }
  };
  user.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },      
    name: {
      type: DataTypes.STRING,
      allowNull: false,    
      validate: {
        notEmpty: {
          msg: "Column name cannot be empty"
        },
        len: {
          args: [ 6, 255],
          msg: 'Name length must be betweeen 6 and 255'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already taken!'
      },
      validate: {
        notEmpty: {
          msg: "Column name cannot be empty"
        },
        isEmail: {
          msg: 'Plaese add a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Column name cannot be empty"
        },
        len: {
          args: [ 6, 255],
          msg: 'Name length must be betweeen 6 and 255'
        }
      }
    }
  }, 
  {
    // hooks - cripta la password
    hooks: {
      beforeCreate: (user) => {
        user.password = bc.hashSync(user.password, 12);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return user;
};