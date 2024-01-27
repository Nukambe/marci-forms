"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "firstName", {
      type: Sequelize.STRING(256),
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING(256),
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: "user",
    });
    await queryInterface.removeColumn("Users", "admin", {});
    await queryInterface.removeColumn("Users", "username", {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "firstName", {});
    await queryInterface.removeColumn("Users", "lastName", {});
    await queryInterface.removeColumn("Users", "role", {});
    await queryInterface.addColumn("Users", "admin", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn("Users", "username", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
