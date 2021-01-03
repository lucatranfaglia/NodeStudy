'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(12)
      },
      todo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      listId: {
        type: Sequelize.BIGINT(12),
        // allowNull: false,
        index: true,
        references:{
          model: 'Lists',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'set null'
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('Todos');
  }
};