const express = require('express');
const app = express();
const Producto = require('../models/producto');

app.get('/', (req, res) => {
    Producto.find({}).sort({nombre: 1}).select({nombre: 1}).exec((err, productos) => {
        if (err) {
            return res.status(400).json({mensajeError: err})
        }
        res.status(200).json({
            productos: productos
        })
    })
})

app.get('/:_id', (req, res) => {
    Producto.findOne({_id: req.params._id}, (err, producto) => {
        if (err) {
            return res.status(400).json({mensajeError: err})
        }
        res.status(200).json({
            producto: producto
        })
    })
})

app.get('/busqueda/:termino', (req, res) => {
    Producto.find({nombre: {$regex: req.params.termino}}, (err, productos) => {
        if (err) {
            return res.status(400).json({mensajeError: err})
        }
        res.status(200).json({
            productos: productos
        })
    })
})

app.post('/', (req, res) => {
    let producto = new Producto({
        nombre: req.body.nombre,
        sku: req.body.sku,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        proveedor: req.body.proveedor
    })
    producto.save((err, producto) => {
        if (err) {
            let mensajeError;
            if(err.code === 11000) {
                mensajeError = "El código sku ya existe"
            } else {
                mensajeError = "Otro tipo de error...";
            }
            return res.status(400).json({
                mensajeError: mensajeError,
                code: "11000",
                link: "https://github.com/apimongoose/error11000"
            })
        }
        res.status(200).json({
            mensaje: 'El producto ha sido creado correctamente',
            _id_nuevoProducto: producto._id
        })
    })
})

app.put('/:_id', (req, res) => {

    let actualizacion = {};

    if(req.body.nombre) {
        actualizacion.nombre = req.body.nombre;
    }

    if(req.body.descripcion) {
        actualizacion.descripcion = req.body.descripcion;
    }

    if(req.body.precio) {
        actualizacion.precio = req.body.precio;
    }

    if(req.body.proveedor) {
        actualizacion.proveedor = req.body.proveedor;
    }

    Producto.findByIdAndUpdate(req.params._id, {$set: actualizacion}, (err, producto) => {
        if (err) {
            return res.status(400).json({mensajeError: err})
        }
        res.status(200).json({
            mensaje: `El producto ${producto.nombre} ha sido actualizado`
        })
    })

})







module.exports = app;