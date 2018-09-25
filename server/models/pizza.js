'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('Pizza', {
    tempo: DataTypes.INTEGER,
    valor: DataTypes.INTEGER
  }, {})
  Pizza.associate = function (models) {
    Pizza.hasOne(models.Tamanho, {foreignKey: 'tamanho_id'})
    Pizza.hasOne(models.Sabor, {foreignKey: 'sabor_id'})
    Pizza.hasMany(models.Extra, {foreignKey: 'extra_id'})
  }
  return Pizza
}
