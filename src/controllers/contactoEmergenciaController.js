const ContactoEmergencia = require('../models/contactoEmergencia');

async function crear(req, res) {
    const { correo, alias, numero } = req.body;

    if (!alias || !numero || !correo) {
        return res.status(400).json({ mensaje: "Datos incompletos." });
    }

    try {
        const existingContact = await ContactoEmergencia.findOne({ where: { USR_CRR: correo, CNTCT_ALIAS: alias } });

        if (existingContact) {
            return res.status(409).json({ mensaje: "Este alias ya está registrado para este usuario." });
        }

        const contacto = await ContactoEmergencia.create({
            CNTCT_ALIAS: alias,
            CNTCT_NUM: numero,
            USR_CRR: correo.trim().toLowerCase()
        });

        return res.status(201).json({ mensaje: "Contacto de emergencia guardado correctamente.", contacto });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear contacto', detalle: error.message || error });
    }
}

async function obtenerPorCorreo(req, res) {
    const { correo } = req.query;
    try {
        const contactos = await ContactoEmergencia.findAll({ where: { USR_CRR: correo } });
        return res.json(contactos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener contactos', detalle: error.message || error });
    }
}
async function eliminar(req, res) {
    const { correo, alias } = req.body;

    if (!correo || !alias) {
        return res.status(400).json({ mensaje: "Faltan datos para eliminar el contacto." });
    }

    try {
        const deleted = await ContactoEmergencia.destroy({
            where: {
                USR_CRR: correo,
                CNTCT_ALIAS: alias
            }
        });

        if (deleted === 0) {
            return res.status(404).json({ mensaje: "No se encontró el contacto para eliminar." });
        }

        return res.status(200).json({ mensaje: "Contacto eliminado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar contacto', detalle: error.message || error });
    }
}

module.exports = {
    crear,
    obtenerPorCorreo,
    eliminar
};