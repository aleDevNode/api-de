'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('files', [{
        id:'dfb5fa9e-550d-4e00-8428-0ed200b58e2f',
        path: 'http://localhost:3000/alessandro.png',
        type:'png',
        created_at: new Date(),
        updated_at: new Date(),
        
      }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('files', null, {});
     
  }
};
