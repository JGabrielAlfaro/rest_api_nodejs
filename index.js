const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Permite que un cliente se conecte a un servidor para el intercambio de datos
require('dotenv').config({path:'variables.env'})


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

//Definir un dominio para recibir las peticiones

const whitelist = [process.env.FRONTEND_URL, process.env.BACKEND_URL]; // Agrega el dominio correcto
const corsOptions = {
    origin: (origin, callback) => {
        //Revisar si la peticion viene de un servidor que estamos permitiendo en la lista blanca
        const existe = whitelist.some(dominio => dominio === origin);
        if (existe || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar CORS
app.use(cors(corsOptions));

//Rutas de la app
app.use('/', routes());

//Carpeta publica   
app.use(express.static('uploads'));

//Asignamos el puerto al servidor
// app.listen(5000);
app.listen(process.env.PORT || 5000, process.env.HOST || '0.0.0.0',() => console.log('Servidor iniciado...'));
