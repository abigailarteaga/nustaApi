const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactoEmergencia = sequelize.define('ContactoEmergencia', {
  CNTCT_ID: {
    type: DataTypes.DECIMAL,
    primaryKey: true,
    autoIncrement: true
  },
  USR_CRR: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CNTCT_ALIAS: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CNTCT_NUM: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'CNTCT_EMER',
  timestamps: false
});

module.exports = ContactoEmergencia;