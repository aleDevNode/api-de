'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.createTable('members', { 
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(255),
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
          
        },
        function: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        rf: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
       
        fullName: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique:true,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique:true,
        },
        cellphone: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique:true,
        },    
        description: {
          type: Sequelize.TEXT,
                   
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
     await queryInterface.dropTable('members');
    
  }
};
