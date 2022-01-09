'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('files', [ 
        {
        id:'dfb5fa9e-550d-4e00-8428-0ed200b58e2f',
        path: 'http://localhost:3000/avatar.svg',
        type:'png',
        file_name:'avatar.svg',
        created_at: new Date(),
        updated_at: new Date(),
        
      },
     {
        id:'dfb5fa9e-550d-4e00-8428-0ed200b58e5d',
        path: 'http://localhost:3000/images/capa.jpg',
        type:'jpg',
        file_name:'capa.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('files', null, {});
     
  }
};
