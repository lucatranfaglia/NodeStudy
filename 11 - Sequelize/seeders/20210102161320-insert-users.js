'use strict';

const bc = require('bcrypt');
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
    let userData = [];
    for (let i = 0; i <50; i++){
      userData.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: bc.hashSync(faker.name.findName(), 12),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Users', userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
