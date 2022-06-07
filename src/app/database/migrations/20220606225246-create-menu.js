'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
          allowNull: false,
          type: Sequelize.STRING
      },
      description: {
          allowNull: false,
          type: Sequelize.STRING
      },
      price: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menu');
  }
};