const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        } ,
        cantidad: {
            type: Number,
            required: true
        },
    }],
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Pedidos', pedidosSchema)