'use strict';
const uuid = require('../../utils/uuid')
const id = uuid()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('members', [{
      id,
      name: 'Alessandro',
      function:'TSTJR',
      rf:'122.857-9',
      fullName:'Alessandro Barbosa Vitorio',
      email: 'asovitoriogmail.com',
      cellphone:'95496-5202',
      description:'Funcionario lotado na regional sul desde 2008',
      status:true,
      created_at: new Date(),
      updated_at: new Date(),
     }], {});
      },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('members', null, {});
    
  }
};
