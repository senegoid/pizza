'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('Pizza', {
    tempo: DataTypes.INTEGER,
    valor: DataTypes.INTEGER
  }, {})
  Pizza.associate = function (models) {
    // Pizza.hasMany(models.Tamanho, { foreignKey: 'id' })
    //Pizza.hasOne(models.Tamanho, {foreignKey: 'tamanho_id'})
    //Pizza.hasOne(models.Sabor, {foreignKey: 'sabor_id'})
    //Pizza.belongsToMany(models.Extra, {foreignKey: 'pizza_id'})
  }
  return Pizza
}
