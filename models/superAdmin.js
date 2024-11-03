"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Superadmin extends Model {}
  Superadmin.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Superadmin" }
  );
  return Superadmin;
};
