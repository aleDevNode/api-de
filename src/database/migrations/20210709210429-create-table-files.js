'use strict';

const {
  date
} = require("faker/locale/zh_TW");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,

      },
      episode_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: {
            tableName: 'episodes'
          },
          key: 'id'
        }
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });

  },

  down: async (queryInterface, Sequelize) => {


    await queryInterface.dropTable('file');

  }
};