'use strict';
const uuid = require('../../utils/uuid')
const id = uuid()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     
     await queryInterface.bulkInsert('episodes', [{
      id:"d7066994-ba3d-41ba-a74b-2e97ab7d3424",
      title: "Faladev #30 | A importância da contribuição em Open Source",
      members:"Diego Fernandes, João Pedro, Diego Haz e Bruno Lemos",
      published_at:"2021-01-15 13:00:00",
      thumbnail:"https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg",
      description: "<p>Nesse episódio do Faladev, Diego Fernandes se reúne com João Pedro Schmitz, Bruno Lemos e Diego Haz, para discutir sobre a importância da contribuição open source e quais desafios circulam na comunidade.</p><p>A gente passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso. Toda semana reunimos profissionais da tecnologia para discutir sobre tudo que circula na órbita da programação.</p><p>O Faladev é um podcast original Rocketseat.</p>",
      created_at: new Date(),
      updated_at: new Date(),
     },
     {
      id:"dc887dc5-4879-4129-9879-64d479e09825",
      title: "Faladev #29 | Duas perspectivas diferentes na mesa: uma conversa sobre PF e OOP",
      members: "Diego Fernandes, Dani Leão, Laura Beatris e Rafael Camarda",
      published_at: "2021-01-15 13:00:00",
      thumbnail: "https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/funcional.jpg",
      description: "<p>Diego e Dani receberam Laura Beatris e Rafael Camarda na mesa do Faladev para conversarem sobre programação funcional e programação orientada a objetos.</p><p>Análises de mercado, conceitos na prática e desafios na adoção de qualquer método de desenvolvimento. Tudo isso numa conversa dinâmica e relevante para nosso público.</p><p>A gente passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso. Toda semana reunimos profissionais da tecnologia para discutir sobre tudo que circula na órbita da programação.</p><p>O Faladev é um podcast original Rocketseat.</p>\n",
      created_at: new Date(),
      updated_at: new Date(),
     }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('episodes', null, {});
     
  }
};
