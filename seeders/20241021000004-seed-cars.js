"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(`SELECT id FROM "Users";`);
    const userIds = users[0];
    const cars = [];

    for (let i = 0; i < 50; i++) {
      cars.push({
        name: faker.vehicle.model(),
        brand: faker.vehicle.manufacturer(),
        year: faker.number.int({ min: 1990, max: 2023 }),
        userId: userIds[i % userIds.length].id,
        createdBy: userIds[i % userIds.length].id,
        updatedBy: userIds[i % userIds.length].id,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }

    await queryInterface.bulkInsert("Cars", cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
