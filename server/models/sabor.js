'use strict'
module.exports = (sequelize, DataTypes) => {
  const Sabor = sequelize.define('Sabor', {
    nome: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER
  }, {})
  Sabor.associate = function (models) {
    // associations can be defined here
  }
  return Sabor
}
