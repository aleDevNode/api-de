'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique:true,
      },
      login: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique:true,
      },    
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
       
      },
      avatar:{
        type:Sequelize.STRING(255),
        defaultValue:'avatar.png'
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
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
    await queryInterface.dropTable('users');
    
  }
};
