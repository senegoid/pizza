'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pizzas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tamanho_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tamanho',
          key: 'id'
        },
        allowNull: false
      },
      sabor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sabor',
          key: 'id'
        },
        allowNull: false
      },
      extra_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Extra',
          key: 'id'
        },
        allowNull: true
      },
      tempo: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pizzas')
  }
}
