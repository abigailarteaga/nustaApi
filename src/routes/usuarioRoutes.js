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
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               USR_CRR:
 *                 type: string
 *                 example: correo@ejemplo.com
 *               USR_PASS:
 *                 type: string
 *               USR_NMBR:
 *                 type: string
 *               USR_APLLD:
 *                 type: string
 *               USR_EDAD:
 *                 type: integer
 *               USR_PESO:
 *                 type: number
 *               USR_ALT:
 *                 type: number
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuario/{correo}:
 *   get:
 *     summary: Obtiene un usuario por correo
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:correo', usuarioController.getUsuario);

/**
 * @swagger
 * /api/usuario/{correo}:
 *   delete:
 *     summary: Elimina un usuario por correo
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:correo', usuarioController.eliminarUsuario);
router.put('/:correo', usuarioController.editarUsuario);


/**
 * @swagger
 * /api/usuario/solicitar-codigo:
 *   post:
 *     summary: Solicita un código de verificación para un correo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: ejemplo@gmail.com
 *     responses:
 *       200:
 *         description: Código enviado con éxito
 *       500:
 *         description: Error al enviar el código
 */
router.post('/solicitar-codigo', usuarioController.solicitarCodigo);

/**
 * @swagger
 * /api/usuario/verificar-codigo:
 *   post:
 *     summary: Verifica un código recibido por correo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: ejemplo@gmail.com
 *               codigo:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 */
router.post('/verificar-codigo', usuarioController.verificarCodigo);

module.exports = router;
