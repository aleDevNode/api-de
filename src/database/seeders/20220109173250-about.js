'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('about', [{
      id:'acb5fg8e-600d-4e00-8428-0ed200b58f4j',
      title: 'Sobre',
      description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nemo quia eos. Dolor sunt neque autem reiciendis rerum odit corrupti quasi ipsa aperiam officiis dolores, eaque quae animi, vel maxime?Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque officiis nesciunt ipsam sed amet quod temporibus commodi aliquam! Repellendus nostrum voluptatum corrupti voluptatem ipsa rerum, impedit quisquam laudantium vel aperiam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit reiciendis ullam cupiditate quasi, inventore accusantium quaerat doloribus repudiandae laboriosam delectus minus natus, dolores sunt non voluptatum saepe consectetur pariatur! Ea?`,
      file_id:'dfb5fa9e-550d-4e00-8428-0ed200b59e5d',
      created_at: new Date(),
      updated_at: new Date(),
      
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('about', null, {});
     
     
  }
};
