const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res, next) => {

    //leer los datos del usuario
    const usuario = new Usuarios(req.body);
    const salt = await bcrypt.genSalt(12);
    usuario.password = await bcrypt.hash(req.body.password, salt);

    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {    
        console.log(error);
        res.json({ mensaje: 'Hubo un error al crear el usuario' });
        // next();
    }
}

exports.autenticarUsuario = async (req, res, next) => { 

    //Buscar el usuario por email
    const {email} = req.body;
    const usuario = await Usuarios.findOne({ email });
    if (!usuario) {
        //El usuario no existe
        await res.status(401).json({ mensaje: 'Ese usuario no existe' });
        return next();
    }else {
        //El usuario existe => Comprobar el password
        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            //El password es incorrecto
            await res.status(401).json({ mensaje: 'La contraseña es incorrecta' });
            return next();
        }else {
            //El password es correcto //Crear JWT
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            },
            'LLAVESECRETA',
            { expiresIn: '5h' }
            )

            //Devolver el token
            res.json({ token });
        }
    }
}