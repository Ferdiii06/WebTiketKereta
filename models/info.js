const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Info = sequelize.define('Info', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  valid_until: { type: DataTypes.DATEONLY }
}, {
  timestamps: false
});

module.exports = Info;