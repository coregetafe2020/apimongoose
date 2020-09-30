const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const autenticacion = require('../middleware/autenticacion');

const Usuario = require('../models/usuario');

app.post('/', (req, res) => {
    let usuario = new Usuario({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        departamento: req.body.departamento
    })
    usuario.save((err, usuario) => {
        if(err) {
            return res.status(400).json({mensajeError: err})
        }
        res.status(200).json({
            mensaje: 'El usuario ha sido creado correctamente'
        })
    })
})

app.post('/login', autenticacion.login  , (req, res) => {
    res.status(200).json({
        ok: true
    })
})








module.exports = app;