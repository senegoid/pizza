'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tamanhos', [
      { nome: 'Pequena', valor: 20, minutos: 15, CreatedAt: new Date(), UpdatedAt: new Date() },
      { nome: 'Média', valor: 30, minutos: 20, CreatedAt: new Date(), UpdatedAt: new Date() },
      { nome: 'Grande', valor: 40, minutos: 25, CreatedAt: new Date(), UpdatedAt: new Date() }
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
}
