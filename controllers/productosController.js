const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');


const path = require('path');
const fs = require('fs');

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename){
           producto.imagen = req.file.filename
        }
        //Almacenar el registro
        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto' });
    } catch (error) {
        //si hay un error, console.log el error y next
        console.log(error);
        next();
    }
}

const configuracionMulter = {
    limits: { fileSize: 1000000 },
    storage: fileStorage = multer.diskStorage({
        destination: path.resolve(__dirname, '../uploads'),
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //el callback se ejecuta como true o false, o true si hay error o false si no hay error
            cb(null, true);
        } else {    
            cb(new Error('Formato No Válido'));
        }
    }
}
const upload = multer(configuracionMulter).single('imagen');   //imagen es el nombre de la base de datos
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE'){
                    req.flash('error', 'El archivo es muy grande: Máximo 1MB');
                }else{
                    req.flash('error', error.message);
                }
            }else{
                req.flash('error', error.message);
            }
            res.redirect('/');
            return;
        }else{
            return next();
        }
    })
}


//Obtiene todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find().lean();
        res.json( productos );
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto en especifico
exports.mostrarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await Productos.findById(id).lean();
        if(!producto) {
             res.json({ mensaje: 'El producto no existe' });
             return next();
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;  
        // Construimos un nuevo producto.
        let nuevoProducto = req.body;

        // Verificamos si hay una imagen nueva.
        if(req.file){
            nuevoProducto.imagen = req.file.filename;

            // Eliminar la imagen anterior si existe
            let copiaProducto = await Productos.findById(id).lean();
            const filePath = path.join(__dirname, '..', 'uploads', copiaProducto.imagen);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error al eliminar la imagen anterior:', err);
                }
            });

        } else {
            let copiaProducto = await Productos.findById(id).lean();
            nuevoProducto.imagen = copiaProducto.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id:id}, nuevoProducto, { new: true }).lean();
        
        res.json(producto);        

    } catch (error) {
        console.log(error);
        next();
    }
};


exports.eliminarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        let producto = await Productos.findOneAndDelete({_id:id}).lean();
        res.json({mensaje: 'Se elimino el producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}