'use strict';

module.exports = {
 async up (queryInterface, Sequelize) {
    return  queryInterface.bulkInsert('Teams', [{
        creator_id: 1,
        name: 'Team 999',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Teams', null, {});
  }
};
