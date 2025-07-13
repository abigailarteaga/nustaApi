// src/models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  USR_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  USR_APLLD: DataTypes.STRING,
  USR_NMBR: DataTypes.STRING,
  USR_EDAD: DataTypes.INTEGER,
  USR_PESO: DataTypes.FLOAT,
  USR_ALT: DataTypes.FLOAT,
  USR_CRR: DataTypes.STRING,
  USR_PASS: DataTypes.STRING,
  USR_ESTADO: DataTypes.STRING,
}, {
  tableName: 'USUARIO',
  timestamps: false,
});

module.exports = Usuario;
