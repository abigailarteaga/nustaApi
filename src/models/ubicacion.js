const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ubicacion = sequelize.define('Ubicacion', {
  UBI_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UBI_LATI: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false
  },
  UBI_LONGI: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false
  },
  UBI_FECHAHORA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  UBI_ORIGEN: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'UBICACION',
  timestamps: false
});

module.exports = Ubicacion;