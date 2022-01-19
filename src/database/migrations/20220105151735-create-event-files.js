'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("event_files", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(255),
      },
      file_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        onDelete: 'cascade',
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
        onDelete: 'cascade',
        references: {
          model: {
            tableName: "events",
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
    await queryInterface.dropTable("event_files");
  },
};

