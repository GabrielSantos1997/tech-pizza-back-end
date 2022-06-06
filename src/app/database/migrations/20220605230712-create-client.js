'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
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
      },
      zip_code: {
          allowNull: true,
          type: Sequelize.STRING
      },
      state: {
          allowNull: true,
          type: Sequelize.STRING
      },
      city: {
          allowNull: true,
          type: Sequelize.STRING
      },
      address: {
          allowNull: true,
          type: Sequelize.STRING
      },
      number: {
          allowNull: true,
          type: Sequelize.STRING
      },
      complement: {
          allowNull: true,
          type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};