'use strict';
require('dotenv').config()
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('files', [ 
        {
        id:'dfb5fa9e-550d-4e00-8428-0ed200b58e2f',
        path: `${process.env.URI_END_POINT}uploads/avatar/avatar-male.svg`,
        type:'png',
        file_name:'avatar.svg',
        created_at: new Date(),
        updated_at: new Date(),
        
      },
     {
        id:'dfb5fa9e-550d-4e00-8428-0ed200b58e5d',
        path: `${process.env.URI_END_POINT}/images/capa.jpg`,
        type:'image/jpg',
        file_name:'capa.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        
      },
     {
        id:'dfb5fa9e-550d-4e00-8428-0ed200b59e5d',
        path: `${process.env.URI_END_POINT}/about.jpg`,
        type:'image/jpg',
        file_name:'about.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        
      },
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('files', null, {});
     
  }
};
