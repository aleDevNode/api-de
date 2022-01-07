"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("home", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(255),
      },
      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      sub_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      file_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: {
            tableName: "files",
          },
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("home");
  },
};
