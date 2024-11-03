const { Superadmin } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("superadmin123", 10);
    return queryInterface.bulkInsert("Superadmins", [
      {
        email: "superadmin@mail.com",
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Superadmins", {
      email: "superadmin@mail.com",
    });
  },
};
