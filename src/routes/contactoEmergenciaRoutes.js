const express = require('express');
const router = express.Router();
const ContactoEmergenciaController = require('../controllers/contactoEmergenciaController');

/**
 * @swagger
 * /api/contactoEmergencia:
 *   post:
 *     summary: Crea un contacto de emergencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               alias:
 *                 type: string
 *               numero:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto creado
 */
router.post('/', ContactoEmergenciaController.crear);

/**
 * @swagger
 * /api/contactoEmergencia:
 *   get:
 *     summary: Obtiene contactos de emergencia por correo
 *     parameters:
 *       - in: query
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo del usuario
 *     responses:
 *       200:
 *         description: Lista de contactos
 */
router.get('/', ContactoEmergenciaController.obtenerPorCorreo);

router.delete('/', ContactoEmergenciaController.eliminar);

module.exports = router;