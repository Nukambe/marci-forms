"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Submissions", "questionId", {});
    await queryInterface.removeColumn("Submissions", "answer", {});
    await queryInterface.removeColumn("Submissions", "name", {});
    await queryInterface.addColumn("Submissions", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users" },
    });
    await queryInterface.addColumn("Submissions", "answers", {
      type: Sequelize.JSON,
    });
    await queryInterface.dropTable("Questions");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Submissions", "questionId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Questions" },
    });
    await queryInterface.addColumn("Submissions", "answer", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Submissions", "name", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("Submissions", "userId", {});
    await queryInterface.removeColumn("Submissions", "answers", {});
    await queryInterface.createTable("Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "QuestionTypes" },
      },
      options: {
        type: Sequelize.JSON,
      },
      formId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Forms" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
};
