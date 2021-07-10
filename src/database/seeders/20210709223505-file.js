'use strict';
const uuid = require('../../utils/uuid')
const id = uuid()
module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('file', [{
      id:uuid(),
      url: "https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/audios/opensource.",
        type: "audio/x-m4a",
        duration:3981,
        episode_id:"d7066994-ba3d-41ba-a74b-2e97ab7d3424",
        created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id:uuid(),
      url: "https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/audios/funcional.m4a",
      type: "audio/x-m4a",
      duration: 4237,
      episode_id:"dc887dc5-4879-4129-9879-64d479e09825",
      created_at: new Date(),
      updated_at: new Date(),
    }
  ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('file', null, {});
    
  }
};
