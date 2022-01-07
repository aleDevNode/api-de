'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("events_files", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(255),
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
      event_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: {
            tableName: "events",
          },
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("events_files");
  },
};

