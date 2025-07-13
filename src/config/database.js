const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BtnAuxilio', 'kawsay', 'zdp(77-2AsHX', {
    host: '46.202.177.158',
    port: 3306,
    dialect: 'mysql',
    logging: false, // puedes poner true para ver las consultas en consola
    dialectOptions: {
        ssl: false, // si usas SSL en tu host, cambia esto a true y configura el certificado
    }
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos MySQL establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

testConnection();

module.exports = sequelize;
