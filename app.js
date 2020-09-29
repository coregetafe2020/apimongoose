const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const producto = require('./routes/producto');

const opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost:27017/compras', opciones)
        .then(() => {
            console.log('Respuesta base datos ok')
        })
        .catch((err) => {
            console.log('Error conexión', err)
        })

app.use(bodyParser.urlencoded({extended: true}))

app.use('/producto', producto);

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})