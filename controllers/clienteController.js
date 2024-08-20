const Clientes = require('../models/Clientes');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//Agrega un nuevo cliente
exports.nuevoCliente = async (req, res,next) => {
    const cliente = new Clientes(req.body);

    // console.log(cliente);

    try {
       //Almacenar el registro
       await cliente.save();
       res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {    
       //si hay un error, console.log el error y next
        // console.log(error);
    res.send(error);
       next();
    }
}

exports.mostrarClientes = async (req, res,next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}



exports.mostrarCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);

        // Validar que el ID es un ObjectId válido
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const cliente = await Clientes.findById(id).lean();

        if (!cliente) {
            return res.status(404).json({ mensaje: 'El cliente no existe' });
        }

        res.json(cliente);

    } catch (error) {
        console.error('Error al buscar el cliente:', error);
        res.status(500).json({ mensaje: 'Error al buscar el cliente' });
    } finally {
        next();
    }
}

exports.actualizarCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cliente = await Clientes.findOneAndUpdate({_id:id},req.body, { new: true }).lean();
        res.json(cliente);
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
    } finally {
        next();
    }
}


exports.eliminarCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cliente = await Clientes.findOneAndDelete({_id:id}).lean();
        // console.log(id)
        res.json({mensaje: 'Se elimino el cliente'});
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el cliente' });
    } finally {
        next();
    }
}
