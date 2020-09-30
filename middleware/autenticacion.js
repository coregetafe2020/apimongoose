const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {

    Usuario.findOne({email: req.body.email}, (err, usuario) => {
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        if(!usuario) {
            return res.status(400).json({
                mensaje: 'El correo electrónico no existe'
            })
        }
        if(!bcrypt.compareSync(req.body.password, usuario.password)) {
            return res.status(400).json({
                mensaje: 'Contraseña incorrecta'
            })
        }
    
        next()
    })

}