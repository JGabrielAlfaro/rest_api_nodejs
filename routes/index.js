const express = require('express')
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function(){
    //***CLIENTES */
   router.post('/clientes', clienteController.nuevoCliente)  //Agrega nuevos clientes vía POST
   router.get('/clientes', clienteController.mostrarClientes) //Obtiene todos los clientes
   router.get('/clientes/:id', clienteController.mostrarCliente); //Muestra un cliente en especifico
   router.put('/clientes/:id', clienteController.actualizarCliente);  //Actualiza un cliente
   router.delete('/clientes/:id', clienteController.eliminarCliente); //Elimina un cliente

   

   //***PRODUCTOS */

   router.post('/productos',productosController.subirArchivo, productosController.nuevoProducto)  //Agrega nuevos productos vía POST
   router.get('/productos', productosController.mostrarProductos) //Obtiene todos los productos
   router.get('/productos/:id', productosController.mostrarProducto); //Muestra un producto en especifico
   router.put('/productos/:id',productosController.subirArchivo, productosController.actualizarProducto);  //Actualiza un producto
   router.delete('/productos/:id', productosController.eliminarProducto); //Elimina un producto

   //***PEDIDOS */
   router.post('/pedidos', pedidosController.nuevoPedido);// Agregar un nuevo pedido
   router.get('/pedidos', pedidosController.mostrarPedidos); //Obtiene todos los pedidos
   router.get('/pedidos/:id', pedidosController.mostrarPedido); //Obtiene un pedido.
   router.put('/pedidos/:id', pedidosController.actualizarPedido); //Actualiza un pedido
   router.delete('/pedidos/:id', pedidosController.eliminarPedido); //Elimina un pedido

    return router;
}