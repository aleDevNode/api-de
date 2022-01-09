'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('home', [{
      id:'acb5fg8e-550d-4e00-8428-0ed200b58f4j',
      title: 'Diretoria de Representação',
      sub_title:'Trabalho e Transparência',
      file_id:'dfb5fa9e-550d-4e00-8428-0ed200b58e5d',
      created_at: new Date(),
      updated_at: new Date(),
      
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('home', null, {});
      await queryInterface.bulkDelete('files', null, {});
     
  }
};
