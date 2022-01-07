'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.addColumn('members', 'gender',{
     
        type: Sequelize.STRING,
        defaultValue: 'M',
      
     });
     
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.removeColumn('members','gender');
    
  }
};
