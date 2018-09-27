'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('Pizza', {
    tempo: DataTypes.INTEGER,
    valor: DataTypes.INTEGER
  }, {})
  Pizza.associate = function (models) {
    Pizza.belongsToMany(models.Extra, {through: 'PizzaExtras'})
    Pizza.belongsTo(models.Tamanho, { foreignKey: 'tamanhoId' })
    Pizza.belongsTo(models.Sabor, { foreignKey: 'saborId' })
  }
  return Pizza
}
