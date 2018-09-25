'use strict'
module.exports = (sequelize, DataTypes) => {
  const Tamanho = sequelize.define('Tamanho', {
    nome: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER
  }, {})
  Tamanho.associate = function (models) {
    // associations can be defined here
  }
  return Tamanho
}
