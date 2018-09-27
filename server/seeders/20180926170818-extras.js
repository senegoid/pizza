'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Extras', [
      { nome: 'Extra Bacon', valor: 3, minutos: 0, CreatedAt: new Date(), UpdatedAt: new Date() },
      { nome: 'Sem cebola', valor: 0, minutos: 0, CreatedAt: new Date(), UpdatedAt: new Date() },
      { nome: 'Borda Recheada', valor: 10, minutos: 5, CreatedAt: new Date(), UpdatedAt: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
