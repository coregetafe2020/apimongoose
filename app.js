const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const producto = require('./routes/producto');
const proveedor = require('./routes/proveedor');
const usuario = require('./routes/usuario');
const cors = require('cors');

app.use(cors());

const opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

const urlMongo = process.env.URLMONGO;

mongoose.connect(urlMongo, opciones)
        .then(() => {
            console.log('Respuesta base datos ok')
        })
        .catch((err) => {
            console.log('Error conexión', err)
        })

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/producto', producto);
app.use('/proveedor', proveedor);
app.use('/usuario', usuario);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})