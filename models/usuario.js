const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    departamento: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema);