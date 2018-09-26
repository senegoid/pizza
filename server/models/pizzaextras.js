'use strict'
module.exports = (sequelize, DataTypes) => {
  const PizzaExtras = sequelize.define('PizzaExtras', {    
  }, {})
  PizzaExtras.associate = function (models) {    
  }
  return PizzaExtras
}