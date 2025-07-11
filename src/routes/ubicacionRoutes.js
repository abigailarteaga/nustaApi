const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');

/**
 * @swagger
 * /api/ubicacion:
 *   post:
 *     summary: Registra una nueva ubicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               latitud:
 *                 type: number
 *               longitud:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ubicación guardada y enviada con éxito
 */
router.post('/', ubicacionController.crear);

// Otros endpoints...

module.exports = router;