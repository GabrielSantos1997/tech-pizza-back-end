'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
          allowNull: false,
          type: Sequelize.STRING
      },
      email: {
          allowNull: false,
          type: Sequelize.STRING
      },
      phone_number: {
          allowNull: false,
          type: Sequelize.STRING
      },
      occupation: {
        allowNull: false,
        defaultValue: "UNSPECIFIED",
        type: Sequelize.ENUM("UNSPECIFIED", "PIZZAMAKER", "CLERK", "DELIVERYMAN", "CLEANING"),
      },
      is_active: {
          allowNull: false,
          defaultValue: true,
          type: Sequelize.BOOLEAN
      },
      created_at: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updated_at: {
          allowNull: false,
          type: Sequelize.DATE
      },
      deleted_at: {
          allowNull: true,
          type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employee');
  }
};