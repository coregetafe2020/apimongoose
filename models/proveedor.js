let mongoose = require('mongoose');

let provincias = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

let ProveedorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    cif: {type: String, unique: true, required: true},
    direccion: {
        calle: String,
        localidad: String,
        provincia: {type: String, enum: provincias}
    },
    tipoProveedor: [String]
}, {collection: 'proveedores', timestamps: true})

module.exports = mongoose.model('Proveedor', ProveedorSchema);