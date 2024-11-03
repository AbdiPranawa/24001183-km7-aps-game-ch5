"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Auths, { foreignKey: "userId", as: "auth" });
      Users.hasMany(models.Cars, { foreignKey: "userId", as: "cars" });
    }
  }

  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "member"),
        allowNull: false,
        defaultValue: "member",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};
