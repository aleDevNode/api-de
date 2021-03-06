'use strict';
const uuid = require('../../utils/uuid')
const id = uuid()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('members', [{
      id:'dfb5fa9e-550d-4e00-8428-0ed200b58e2a',
      name: 'Alessandro',
      func:'TSTJR',
      birth:'1980-03-06',
      rf:'1228579',
      full_name:'Alessandro Barbosa Vitorio',
      email: 'asovitorio@gmail.com',
      cellphone:'954965202',
      time:true,
      description:'Minha Vida é meu Deus e minha familia',
      location:'RSU',
      file_id:'dfb5fa9e-550d-4e00-8428-0ed200b58e2f',
      status:true,
      created_at: new Date(),
      updated_at: new Date(),
     }], {});
      },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('members', null, {});
    
  }
};
