const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Permite que un cliente se conecte a un servidor para el intercambio de datos
require('dotenv').config()


// Verificar variables de entorno
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    console.error('Por favor, defina las variables de entorno DB_USER, DB_PASSWORD y MONGO_HOST.');
    process.exit(1);
}

// Conexión a la base de datos
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/restapis`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Conectado...'))
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
        process.exit(1); // Terminar el proceso con error
    });

//Crear el servidor
const app = express();

//Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Habilitar CORS
app.use(cors());

//Rutas de la app
app.use('/', routes());

//Carpeta publica   
app.use(express.static('uploads'));

//Asignamos el puerto al servidor
app.listen(5000);
