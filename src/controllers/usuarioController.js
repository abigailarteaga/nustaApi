const express = require('express');
const Usuario = require('../models/usuario');
const { enviarCodigoVerificacion } = require('../services/correoService');
const codigosPendientes = {}; 


async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener usuarios', detalle: error.message });
    }
}

async function crearUsuario(req, res) {
    try {
        const usuario = await Usuario.create(req.body);
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear usuario', detalle: error.message });
    }
}

async function getUsuario(req, res) {
    const { correo } = req.params;
    try {
        const usuario = await Usuario.findOne({ where: { USR_CRR: correo } });
        if (!usuario) {
            return res.status(404).json({ mensaje: `Usuario con correo ${correo} no encontrado` });
        }
        const nombre = usuario
          ? `${usuario.USR_NMBR}${usuario.USR_APLLD ? ' ' + usuario.USR_APLLD : ''}`
          : "Una mujer";
        return res.json({ ...usuario.toJSON(), nombre });
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener usuario', detalle: error.message });
    }
}

async function eliminarUsuario(req, res) {
    const { correo } = req.params;

    if (!correo) {
        return res.status(400).json({ mensaje: "Falta el correo del usuario a eliminar" });
    }

    try {
        const eliminado = await Usuario.destroy({ where: { USR_CRR: correo } });

        if (eliminado === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        return res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar usuario", detalle: error.message });
    }

}

async function editarUsuario(req, res) {
    const { correo } = req.params;
    const { nuevoCorreo, edad, peso, altura } = req.body;

    try {
        // Verifica si el usuario existe
        const usuario = await Usuario.findOne({ where: { USR_CRR: correo } });

        if (!usuario) {
            return res.status(404).json({ mensaje: `Usuario con correo ${correo} no encontrado` });
        }

        // Actualiza los campos permitidos
        usuario.USR_CRR = nuevoCorreo || usuario.USR_CRR;
        usuario.USR_EDAD = edad ?? usuario.USR_EDAD;
        usuario.USR_PESO = peso ?? usuario.USR_PESO;
        usuario.USR_ALT = altura ?? usuario.USR_ALT;

        await usuario.save();

        return res.json({ mensaje: "Usuario actualizado correctamente", usuario });
    } catch (error) {
        return res.status(500).json({ error: "Error al editar usuario", detalle: error.message });
    }
}
async function solicitarCodigo(req, res) {
  const { correo } = req.body;
  if (!correo) return res.status(400).json({ mensaje: "Falta el correo" });

  const codigo = Math.floor(100000 + Math.random() * 900000); // 6 dígitos
  codigosPendientes[correo] = codigo;

  try {
    await enviarCodigoVerificacion(correo, codigo);
    return res.json({ mensaje: "Código enviado con éxito" });
  } catch (error) {
    return res.status(500).json({ error: "Error al enviar correo", detalle: error.message });
  }
}

async function verificarCodigo(req, res) {
  const { correo, codigo } = req.body;
  if (!correo || !codigo) {
    return res.status(400).json({ mensaje: "Correo y código requeridos" });
  }

  if (parseInt(codigo) === codigosPendientes[correo]) {
    delete codigosPendientes[correo];
    return res.json({ verificado: true });
  }

  return res.json({ verificado: false, mensaje: "Código incorrecto" });
}


module.exports = {
  getUsuarios,
  crearUsuario,
  getUsuario,
  eliminarUsuario,
  solicitarCodigo,
  verificarCodigo,
  editarUsuario  
};

