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

   let listData = [];

    //Per avere 10 list ad ogni utente
    for (let i = 1; i<=50; i++){
      for (let j = 0; j <10; j++){
        listData.push({
          name: faker.lorem.sentence(),
          userId: i,
          createdAt: new Date(),
          updatedAt: new Date()
        })        
      }
    }

   
   await queryInterface.bulkInsert('Lists', listData, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Lists', null, {});
  }
};
