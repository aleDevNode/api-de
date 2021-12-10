'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt')
const uuid = require('../../utils/uuid')
const id = uuid()
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('users', [{
        id:"dfb5fa9e-550d-4e00-8428-0ed200b58e2d",
        login: process.env.USER_LOGIN,
        password: bcrypt.hashSync(process.env.USER_PASS,10),
        member_id:"dfb5fa9e-550d-4e00-8428-0ed200b58e2a",
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
      
    }
};
