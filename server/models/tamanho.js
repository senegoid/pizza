'use strict'
module.exports = (sequelize, DataTypes) => {
  const Tamanho = sequelize.define('Tamanho', {
    nome: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER
  }, {})
  Tamanho.associate = function (models) {
    Tamanho.hasMany(models.Pizza, { foreignKey: 'tamanhoId' })
  }
  return Tamanho
}
