const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosShema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: "Agrega tu nombre"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Usuarios', usuariosShema)