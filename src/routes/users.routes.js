const express = require('express');
const path = require('path');
const router = express.Router();

//* Controller Require *//
/* const userController = require('../controllers/user.Controller.js') */
const usersController = require('../controllers/usersController.js')

//* MIDDLEWARE *//
// Para enviar los errores de validación al usuario
const { Registro, Login } = require('../middleware/validation')

// Para verificar si ya inicio sesión el usuario
const guestMiddleware = require('../middleware/guestMiddleware')

// Para verificar redirigir al login si no inició sesión
const authMiddleware = require('../middleware/authMiddleware')

// MULTER 
const uploadFile = require('../middleware/multerMiddleware')

//* Routes *//

// REGISTRO
router.get('/register', guestMiddleware, usersController.register);
router.post('/', uploadFile.any(), Registro, usersController.registration);
// LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);
// PERFIL
router.get('/perfil', authMiddleware, usersController.profile);
// LOGOUT
router.get('/logout', usersController.logout);

// PEDIDOS REALIZADOS POR EL USUARIO
router.get('/pedidos', authMiddleware, usersController.pedidos);
// DIRECCIONES DEL USUARIO
router.get('/direcciones', authMiddleware, usersController.directions);
// DETALLES DE LA CUENTA (VER Y PERSONALIZAR) --- TARJETA, PREFERENCIAS (perros, gatos)
router.get('/detalles', authMiddleware, usersController.details);
/* router.post('/detalles', userController.detailsUpdate); --------------------- POR HACER*/

module.exports = router;