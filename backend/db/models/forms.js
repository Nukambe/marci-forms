"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Forms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Forms.hasMany(models.Submission, {
        foreignKey: "formId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Forms.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 256],
        },
      },
      headerNotes: DataTypes.ARRAY(DataTypes.STRING),
      footerNotes: DataTypes.ARRAY(DataTypes.STRING),
      questions: DataTypes.JSON,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Forms",
    }
  );
  return Forms;
};
