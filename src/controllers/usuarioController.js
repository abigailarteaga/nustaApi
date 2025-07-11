const express = require('express');
const { Usuario } = require('../models/usuario');

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
        const usuario = await Usuario.findOne({ where: { correo } });
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

module.exports = {
    getUsuarios,
    crearUsuario,
    getUsuario
};