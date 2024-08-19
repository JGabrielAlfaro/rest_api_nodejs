const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Authorization for header
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWT');  
        error.statusCode = 401;
        throw error;
    }

    //obtener el token y verificarlo
    // Authorization = authHeader 90200948404404 // Ejemplo.
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //Si es un token valido, pero hay algún error.
    if(!revisarToken){
        const error = new Error('No autenticado, token invalido');
        error.statusCode = 401;
        throw error;
    }

    //Paso todo.
    next();

}