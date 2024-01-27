"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Forms", "header", {});
    await queryInterface.removeColumn("Forms", "subheader", {});

    await queryInterface.addColumn("Forms", "questions", {
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn("Forms", "description", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Forms", "header", {
      type: Sequelize.STRING(256),
    });
    await queryInterface.addColumn("Forms", "subheader", {
      type: Sequelize.STRING(256),
    });

    await queryInterface.removeColumn("Forms", "questions", {});
    await queryInterface.removeColumn("Forms", "description", {});
  },
};
