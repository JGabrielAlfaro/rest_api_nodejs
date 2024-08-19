const express = require('express')
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//Middleware para proteger las rutas.
const auth = require('../middleware/auth');


module.exports = function(){
    //***CLIENTES */
   router.post('/clientes',auth, clienteController.nuevoCliente)  //Agrega nuevos clientes vía POST
   router.get('/clientes',auth, clienteController.mostrarClientes) //Obtiene todos los clientes
   router.get('/clientes/:id',auth, clienteController.mostrarCliente); //Muestra un cliente en especifico
   router.put('/clientes/:id',auth, clienteController.actualizarCliente);  //Actualiza un cliente
   router.delete('/clientes/:id',auth, clienteController.eliminarCliente); //Elimina un cliente

   

   //***PRODUCTOS */

   router.post('/productos',auth,productosController.subirArchivo, productosController.nuevoProducto)  //Agrega nuevos productos vía POST
   router.get('/productos',auth, productosController.mostrarProductos) //Obtiene todos los productos
   router.get('/productos/:id',auth, productosController.mostrarProducto); //Muestra un producto en especifico
   router.put('/productos/:id',auth,productosController.subirArchivo, productosController.actualizarProducto);  //Actualiza un producto
   router.delete('/productos/:id',auth, productosController.eliminarProducto); //Elimina un producto
   router.post('/productos/busqueda/:query',auth, productosController.buscarProducto); //Busca un producto



   //***PEDIDOS */
   router.post('/pedidos',auth, pedidosController.nuevoPedido);// Agregar un nuevo pedido
   router.get('/pedidos',auth, pedidosController.mostrarPedidos); //Obtiene todos los pedidos
   router.get('/pedidos/:id',auth, pedidosController.mostrarPedido); //Obtiene un pedido.
   router.put('/pedidos/:id',auth, pedidosController.actualizarPedido); //Actualiza un pedido
   router.delete('/pedidos/:id',auth, pedidosController.eliminarPedido); //Elimina un pedido

  //***USUARIOS */
   router.post('/crear-cuenta',auth, usuariosController.registrarUsuario);
   router.post('/iniciar-sesion', usuariosController.autenticarUsuario);


    return router;
}