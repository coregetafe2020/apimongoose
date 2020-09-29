const express = require('express');
const app = express();
const Producto = require('../models/producto');

app.post('/', (req, res) => {
    let producto = new Producto({
        nombre: req.body.nombre,
        sku: req.body.sku,
        descripcion: req.body.descripcion,
        precio: req.body.precio
    })
    producto.save((err, producto) => {
        if (err) {
            return res.status(400).json({error: err})
        }
        res.status(200).json({
            mensaje: 'El producto ha sido creado correctamente',
            producto: producto
        })
    })
})







module.exports = app;