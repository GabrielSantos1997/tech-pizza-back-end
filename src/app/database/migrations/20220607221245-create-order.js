'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Demand', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id"
        }
      },
      menu_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Menu",
          key: "id"
        }
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
    await queryInterface.dropTable('Demand');
  }
};