"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Todos",[{
          todo: "Todo 1",
          creator_id: 1,
          team_id: 1,
          isDone: false,
          isPrivate: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }],{});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Todos", null, {});
  },
};
