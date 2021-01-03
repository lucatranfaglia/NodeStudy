'use strict';

const faker = require('faker');
faker.locale='it';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

   let todoData = [];
   //Per avere 10 todo per ognii utente
   for (let i = 1; i <=500; i++){
    for (let j = 0; j <10; j++){
      todoData.push({
        todo: faker.lorem.sentence(),
        listId: i,
        completed: faker.random.arrayElement([0,1]),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
   }
   await queryInterface.bulkInsert('Todos', todoData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Todos', null, {});
    
  }
};
