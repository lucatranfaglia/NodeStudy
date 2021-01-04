'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(12)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.BIGINT(12),
        // allowNull: false,
        index: true,
        references:{
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'set null'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lists');
  }
};