const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db21011', 'db21011', '2x?ZdP5=F+k9', {
    host: 'db21011.public.databaseasp.net',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;