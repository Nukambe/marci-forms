"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.Forms, { foreignKey: "formId" });
      Submission.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Submission.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Forms" },
      },
      answers: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
