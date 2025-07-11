const express = require('express');
const bodyParser = require('body-parser');
const contactoEmergenciaRoutes = require('./routes/contactoEmergenciaRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ubicacion API',
      version: '1.0.0',
      description: 'Documentación de la API Ubicacion',
    },
  },
  apis: ['./src/routes/*.js'], // Ajusta la ruta según tu estructura
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/contactoEmergencia', contactoEmergenciaRoutes);
app.use('/api/ubicacion', ubicacionRoutes);
app.use('/api/usuario', usuarioRoutes);

module.exports = app;