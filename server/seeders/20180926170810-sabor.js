'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sabors', [
      { nome: 'Calabresa', valor: 0, minutos: 0, CreatedAt: new Date(), UpdatedAt: new Date() },
      { nome: 'Marguerita', valor: 0, minutos: 0, CreatedAt: new Date(), UpdatedAt: new Date() },
      { nome: 'Portuguesa', valor: 0, minutos: 5, CreatedAt: new Date(), UpdatedAt: new Date() }
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
