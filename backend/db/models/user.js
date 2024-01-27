"use strict";
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Submission, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
    },
    {
      defaultScope: {
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "resetPasswordToken",
            "resetPasswordExpires",
          ],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ["password", "resetPasswordToken", "resetPasswordExpires"],
          },
        },
        loginUser: {
          attributes: {},
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  User.prototype.toSafeObject = function () {
    const { id, email, role, firstName, lastName } = this;
    return { id, email, role, firstName, lastName }; // context will be the User instance
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: { email: credential },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({ firstName, lastName, email, password }) {
    password = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, password });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
