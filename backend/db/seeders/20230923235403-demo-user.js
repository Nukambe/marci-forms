"use strict";
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i < 128; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();
      const password = bcrypt.hashSync("password");
      const role = "user";

      users.push({
        firstName,
        lastName,
        email,
        password,
        role,
      });
    }

    users.push({
      firstName: "Admin",
      lastName: "User",
      email: "admin@marci-forms.org",
      password: bcrypt.hashSync("administrator"),
      role: "admin",
    });

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", {}, {});
  },
};
