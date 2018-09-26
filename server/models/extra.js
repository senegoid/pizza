'use strict'
module.exports = (sequelize, DataTypes) => {
  const Extra = sequelize.define('Extra', {
    nome: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER
  }, {})
  Extra.associate = function (models) {
    // Extra.hasMany(models.Pizza, { foreignKey: 'extra_id' })
    Extra.belongsToMany(models.Pizza, {through: 'PizzaExtras'})
  }
  return Extra
}
