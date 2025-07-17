require('dotenv').config();
const express = require('express');
const { literal } = require('sequelize');
const Ubicacion = require('../models/ubicacion');
const Usuario = require('../models/usuario');
const ContactoEmergencia = require('../models/contactoEmergencia');
const axios = require('axios');

function getFechaHoraSQL() {
    const fecha = new Date();
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    const hh = String(fecha.getHours()).padStart(2, '0');
    const mi = String(fecha.getMinutes()).padStart(2, '0');
    const ss = String(fecha.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

async function crear(req, res) {
    const { correo, latitud, longitud } = req.body;

    if (!correo || !latitud || !longitud) {
        return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    try {
        // Buscar usuario
        const usuario = await Usuario.findOne({ where: { USR_CRR: correo.trim().toLowerCase() } });
        console.log("Usuario encontrado:", usuario);

        const fechaHoraSQL = getFechaHoraSQL();

        await Ubicacion.create({
            UBI_LATI: latitud,
            UBI_LONGI: longitud,
            UBI_FECHAHORA: fechaHoraSQL,
            UBI_ORIGEN: "APP"
        });

        // Buscar contactos de emergencia
        const contactos = await ContactoEmergencia.findAll({
            where: { USR_CRR: correo.trim().toLowerCase() }
        });

        const contactosTexto = contactos.length > 0
            ? contactos.map(c => `${c.CNTCT_ALIAS}: ${c.CNTCT_NUM}`).join('\n📞 ')
            : "Sin contactos registrados";

        // Nombre del usuario o genérico
        //const nombre = usuario ? usuario.USR_NOMBRE + (usuario.USR_APELLIDO ? ' ' + usuario.USR_APELLIDO : '') : "Una mujer";

        const nombre = usuario && usuario.USR_NMBR
        ? `${usuario.USR_NMBR ?? ''} ${usuario.USR_APLLD ?? ''}`.trim()
        : "Una mujer";

        // Mensaje para Telegram
        const mensaje = `🚨 ${nombre} necesita ayuda\n` +
            `📍 https://maps.google.com/?q=${latitud},${longitud}\n` +
            `📞 Contactos:\n📞 ${contactosTexto}`;

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            return res.status(500).json({ error: "Error: Configuración de Telegram no encontrada." });
        }

        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: mensaje
        });

        return res.status(200).json({ mensaje: "Ubicación guardada y enviada con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error en el servidor",
            mensaje: error.message || JSON.stringify(error),
            stack: error.stack,
            raw: error // Esto mostrará todo el objeto de error
        });
    }
}

module.exports = { crear };