const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', usuarioController.getUsuarios);

/**
 * @swagger
 * /api/usuario:
 *   post:
 *     summary: Crea un usuario
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/', usuarioController.crearUsuario);

// GET: api/usuario/:correo
router.get('/:correo', usuarioController.getUsuario);

module.exports = router;