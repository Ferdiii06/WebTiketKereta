const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Promo = sequelize.define('Promo', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  kode: { type: DataTypes.STRING, allowNull: false, unique: true },
  discount_percent: { type: DataTypes.INTEGER, allowNull: false },
  valid_until: { type: DataTypes.DATEONLY }
});

module.exports = Promo;