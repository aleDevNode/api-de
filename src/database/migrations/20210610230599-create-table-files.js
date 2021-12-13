'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.createTable('files', { 
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(255),
      },
      path: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_name:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type:{
        type: Sequelize.STRING(255),
        allowNull: false,
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
    
    await queryInterface.dropTable('files');
     
  }
};
