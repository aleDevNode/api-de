'use strict';

const {
  date
} = require("faker/locale/zh_TW");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('episodes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,

      },
      members: {
        type: Sequelize.STRING(255),
        allowNull: false,

      },
      published_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),

      },
      thumbnail: {
        type: Sequelize.STRING(255),
        

      },
      description: {
        type: Sequelize.TEXT,
       
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


    await queryInterface.dropTable('episodes');

  }
};