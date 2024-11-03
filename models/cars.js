"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    static associate(models) {
      Cars.belongsTo(models.Users, { foreignKey: "userId", as: "owner" });
      Cars.belongsTo(models.Users, { foreignKey: "createdBy", as: "creator" });
      Cars.belongsTo(models.Users, { foreignKey: "updatedBy", as: "updater" });
      Cars.belongsTo(models.Users, { foreignKey: "deletedBy", as: "deleter" });
      Cars.belongsTo(models.Users, { foreignKey: "deletedBy", as: "deletedByUser" });
    }
  }

  Cars.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Car name is required",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Car brand is required",
          },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Car year is required",
          },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cars",
      paranoid: true,
    }
  );

  return Cars;
};
