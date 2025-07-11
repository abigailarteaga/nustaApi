const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  USR_ID: { type: DataTypes.DECIMAL, primaryKey: true, autoIncrement: true },
  SNGR_ID: DataTypes.INTEGER,
  USR_APLLD: DataTypes.STRING,
  USR_NMBR: DataTypes.STRING,
  USR_EDAD: DataTypes.DECIMAL,
  USR_PESO: DataTypes.DECIMAL,
  USR_ALT: DataTypes.DECIMAL,
  USR_CRR: DataTypes.STRING,
  USR_PASS: DataTypes.STRING,
  USR_ESTADO: DataTypes.STRING
}, {
  tableName: 'USUARIO',
  timestamps: false
});

module.exports = Usuario;